"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'

type ExpenseCategory =
  | 'DEVELOPMENT'
  | 'MARKETING'
  | 'LEGAL'
  | 'OPERATIONS'
  | 'INFRASTRUCTURE'
  | 'SALARIES'
  | 'CONSULTING'
  | 'OTHER'

type PaymentMethod = 'BANK_TRANSFER' | 'CARD' | 'CASH' | 'OTHER'

export function CreateExpenseForm() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('expense.form')
  const tExpense = useTranslations('expense')
  const tFeedback = useTranslations('feedback')

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    category: 'DEVELOPMENT' as ExpenseCategory,
    description: '',
    amount: '',
    currency: 'SAR',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'BANK_TRANSFER' as PaymentMethod,
    vendor: '',
    invoiceNumber: '',
    notes: '',
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      })

      if (!response.ok) throw new Error('Failed to create expense')

      setOpen(false)
      router.refresh()

      setFormData({
        category: 'DEVELOPMENT',
        description: '',
        amount: '',
        currency: 'SAR',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'BANK_TRANSFER',
        vendor: '',
        invoiceNumber: '',
        notes: '',
      })
    } catch (error) {
      console.error('Error creating expense:', error)
      alert(tFeedback('error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t('addButton')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogDescription>{t('description')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">{tExpense('category')}</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value as ExpenseCategory })
                }
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['DEVELOPMENT', 'MARKETING', 'LEGAL', 'OPERATIONS', 'INFRASTRUCTURE', 'SALARIES', 'CONSULTING', 'OTHER'] as const).map(
                    (category) => (
                      <SelectItem key={category} value={category}>
                        {tExpense(`categories.${category}`)}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">{t('descriptionField')}</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(event) =>
                  setFormData({ ...formData, description: event.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">{tExpense('amount')}</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(event) =>
                    setFormData({ ...formData, amount: event.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="currency">{tExpense('currency')}</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    setFormData({ ...formData, currency: value })
                  }
                >
                  <SelectTrigger id="currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAR">SAR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">{tExpense('date')}</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(event) =>
                  setFormData({ ...formData, date: event.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="paymentMethod">{tExpense('paymentMethod')}</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  setFormData({ ...formData, paymentMethod: value as PaymentMethod })
                }
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['BANK_TRANSFER', 'CARD', 'CASH', 'OTHER'] as const).map((method) => (
                    <SelectItem key={method} value={method}>
                      {tExpense(`paymentMethods.${method}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="vendor">{t('vendor')}</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  onChange={(event) =>
                    setFormData({ ...formData, vendor: event.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="invoiceNumber">{t('invoiceNumber')}</Label>
                <Input
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(event) =>
                    setFormData({ ...formData, invoiceNumber: event.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">{tExpense('notes')}</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(event) =>
                  setFormData({ ...formData, notes: event.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '...' : t('submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
