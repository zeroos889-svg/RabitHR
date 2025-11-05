import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, Check, Tag } from "lucide-react";

interface DiscountCodeInputProps {
  originalAmount: number;
  onDiscountApplied: (
    discount: {
      originalAmount: number;
      discountAmount: number;
      finalAmount: number;
      code: string;
    } | null
  ) => void;
}

export function DiscountCodeInput({
  originalAmount,
  onDiscountApplied,
}: DiscountCodeInputProps) {
  const [code, setCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);

  const validateMutation = trpc.discountCodes.validate.useQuery(
    { code },
    { enabled: false }
  );

  const calculateMutation = trpc.discountCodes.calculateDiscount.useQuery(
    { code, originalAmount },
    { enabled: false }
  );

  const handleApply = async () => {
    if (!code.trim()) {
      toast.error("الرجاء إدخال كود الخصم");
      return;
    }

    try {
      // Validate code
      const validation = await validateMutation.refetch();

      if (!validation.data?.valid) {
        toast.error(validation.data?.message || "كود غير صحيح");
        return;
      }

      // Calculate discount
      const calculation = await calculateMutation.refetch();

      if (calculation.data) {
        const discountData = {
          ...calculation.data,
          code,
        };
        setAppliedDiscount(discountData);
        onDiscountApplied(discountData);
        toast.success("تم تطبيق كود الخصم بنجاح!");
      }
    } catch (error: any) {
      toast.error("فشل تطبيق الكود: " + error.message);
    }
  };

  const handleRemove = () => {
    setCode("");
    setAppliedDiscount(null);
    onDiscountApplied(null);
    toast.success("تم إلغاء كود الخصم");
  };

  return (
    <div className="space-y-3">
      {!appliedDiscount ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="أدخل كود الخصم"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              className="pr-10"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleApply();
                }
              }}
            />
          </div>
          <Button
            onClick={handleApply}
            disabled={
              !code.trim() ||
              validateMutation.isFetching ||
              calculateMutation.isFetching
            }
            variant="outline"
          >
            {validateMutation.isFetching || calculateMutation.isFetching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "تطبيق"
            )}
          </Button>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-green-900">
                كود الخصم مفعّل
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              إلغاء
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono">
              {appliedDiscount.code}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {appliedDiscount.discountType === "percentage"
                ? `خصم ${appliedDiscount.discountValue}%`
                : `خصم ${appliedDiscount.discountValue} ﷼`}
            </span>
          </div>

          <div className="pt-2 border-t border-green-200 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">السعر الأصلي:</span>
              <span className="line-through">
                {appliedDiscount.originalAmount} ﷼
              </span>
            </div>
            <div className="flex justify-between text-sm text-green-700 font-semibold">
              <span>الخصم:</span>
              <span>- {appliedDiscount.discountAmount} ﷼</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-green-900">
              <span>المجموع:</span>
              <span>{appliedDiscount.finalAmount} ﷼</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
