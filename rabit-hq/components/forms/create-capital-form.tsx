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

type CapitalType = 'FOUNDER_CONTRIBUTION' | 'INVESTMENT_ROUND' | 'OTHER'

export function CreateCapitalForm() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('capital.form')
  const tCapital = useTranslations('capital')
  const tFeedback = useTranslations('feedback')

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'FOUNDER_CONTRIBUTION' as CapitalType,
    investorName: '',
    amount: '',
    currency: 'SAR',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/capital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      })

      if (!response.ok) throw new Error('Failed to create capital event')

      setOpen(false)
      router.refresh()

      setFormData({
        type: 'FOUNDER_CONTRIBUTION',
        investorName: '',
        amount: '',
        currency: 'SAR',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      })
    } catch (error) {
      console.error('Error creating capital event:', error)
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
      <DialogContent className="sm:max-w-[525px]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogDescription>{t('description')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">{tCapital('type')}</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value as CapitalType })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FOUNDER_CONTRIBUTION">{tCapital('types.FOUNDER_CONTRIBUTION')}</SelectItem>
                  <SelectItem value="INVESTMENT_ROUND">{tCapital('types.INVESTMENT_ROUND')}</SelectItem>
                  <SelectItem value="OTHER">{tCapital('types.OTHER')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="investorName">{tCapital('investorName')}</Label>
              <Input
                id="investorName"
                value={formData.investorName}
                onChange={(event) =>
                  setFormData({ ...formData, investorName: event.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">{tCapital('amount')}</Label>
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
                <Label htmlFor="currency">{tCapital('currency')}</Label>
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
              <Label htmlFor="date">{tCapital('date')}</Label>
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
              <Label htmlFor="notes">{tCapital('notes')}</Label>
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
