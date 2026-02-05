 import { Crown } from "lucide-react";
 import { useState } from "react";
 import { ProUpgradeDialog } from "@/components/dialogs/ProUpgradeDialog";
 
 export function ProUpgradeButton() {
   const [dialogOpen, setDialogOpen] = useState(false);
 
   return (
     <>
       <button
         onClick={() => setDialogOpen(true)}
         className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 transition-colors"
         aria-label="الترقية للنسخة الاحترافية"
       >
         <Crown className="w-5 h-5 text-amber-500" />
       </button>
       
       <ProUpgradeDialog open={dialogOpen} onOpenChange={setDialogOpen} />
     </>
   );
 }