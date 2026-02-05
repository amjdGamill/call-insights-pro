 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import { Crown, Check, Zap, BarChart3, Headphones } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { toast } from "sonner";
 
 interface ProUpgradeDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 const proFeatures = [
   { icon: Zap, label: "تسجيل بجودة فائقة", description: "جودة 320 kbps بدون فقدان" },
   { icon: BarChart3, label: "الإحصاءات المتقدمة", description: "تحليلات تفصيلية لمكالماتك" },
   { icon: Headphones, label: "بدون إعلانات", description: "تجربة خالية من الإعلانات" },
 ];
 
 export function ProUpgradeDialog({ open, onOpenChange }: ProUpgradeDialogProps) {
   const handlePurchase = (plan: "monthly" | "yearly" | "lifetime") => {
     // Simulate purchase - in real app would integrate with payment system
     console.log(`Purchasing ${plan} plan`);
     toast.info("سيتم توجيهك لإتمام عملية الشراء...");
     onOpenChange(false);
   };
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-sm mx-4 rounded-2xl p-0 overflow-hidden">
         {/* Header with gradient */}
         <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white">
           <DialogHeader>
             <div className="mx-auto w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-4">
               <Crown className="w-8 h-8 text-white" />
             </div>
             <DialogTitle className="text-center text-xl text-white">
               النسخة الاحترافية
             </DialogTitle>
             <p className="text-center text-white/80 text-sm mt-2">
               احصل على كل المميزات بدون قيود
             </p>
           </DialogHeader>
         </div>
 
         {/* Features */}
         <div className="p-5 space-y-3">
           {proFeatures.map((feature) => {
             const Icon = feature.icon;
             return (
               <div key={feature.label} className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
                   <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                 </div>
                 <div className="flex-1 min-w-0">
                   <h4 className="font-medium text-foreground text-sm">{feature.label}</h4>
                   <p className="text-xs text-muted-foreground">{feature.description}</p>
                 </div>
                 <Check className="w-5 h-5 text-green-500 shrink-0" />
               </div>
             );
           })}
         </div>
 
         {/* Pricing Options */}
         <div className="px-5 pb-5 space-y-2">
           <Button
             onClick={() => handlePurchase("yearly")}
             className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl relative"
           >
             <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full">
               وفّر 50%
             </div>
             <div className="flex flex-col items-center">
               <span className="font-bold">سنوي - 99 ر.س/سنة</span>
               <span className="text-xs text-white/80">8.25 ر.س/شهر</span>
             </div>
           </Button>
 
           <Button
             onClick={() => handlePurchase("monthly")}
             variant="outline"
             className="w-full h-12 rounded-xl border-2"
           >
             <span className="font-medium">شهري - 19 ر.س/شهر</span>
           </Button>
 
           <Button
             onClick={() => handlePurchase("lifetime")}
             variant="ghost"
             className="w-full h-10 rounded-xl text-amber-600 dark:text-amber-400"
           >
             <span className="text-sm">مدى الحياة - 199 ر.س (دفعة واحدة)</span>
           </Button>
         </div>
 
         {/* Footer */}
         <div className="px-5 pb-4 text-center">
           <p className="text-[10px] text-muted-foreground">
             يمكنك الإلغاء في أي وقت • ضمان استرداد خلال 7 أيام
           </p>
         </div>
       </DialogContent>
     </Dialog>
   );
 }