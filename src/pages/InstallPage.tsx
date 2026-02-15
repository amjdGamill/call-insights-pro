import { useEffect, useState } from "react";
import { Download, Share, MoreVertical, CheckCircle2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-[hsl(var(--success))] mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">تم التثبيت بنجاح!</h1>
          <p className="text-muted-foreground">التطبيق مثبت على جهازك. يمكنك فتحه من الشاشة الرئيسية.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-sm w-full space-y-8 text-center">
        <div className="space-y-2">
          <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mt-4">تثبيت مسجل المكالمات</h1>
          <p className="text-muted-foreground">ثبّت التطبيق على جهازك للوصول السريع والعمل بدون إنترنت</p>
        </div>

        {deferredPrompt ? (
          <Button onClick={handleInstall} size="lg" className="w-full gap-2 text-lg">
            <Download className="w-5 h-5" />
            تثبيت التطبيق
          </Button>
        ) : isIOS ? (
          <div className="glass-card p-6 space-y-4 text-right">
            <h3 className="font-semibold text-foreground">خطوات التثبيت على iPhone:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  اضغط على أيقونة المشاركة <Share className="w-4 h-4 inline" />
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <p className="text-sm text-muted-foreground">اختر "إضافة إلى الشاشة الرئيسية"</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <p className="text-sm text-muted-foreground">اضغط "إضافة"</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-6 space-y-4 text-right">
            <h3 className="font-semibold text-foreground">خطوات التثبيت على Android:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  اضغط على قائمة المتصفح <MoreVertical className="w-4 h-4 inline" />
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <p className="text-sm text-muted-foreground">اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"</p>
              </div>
            </div>
          </div>
        )}

        <a href="/" className="block text-sm text-primary hover:underline">
          العودة للتطبيق
        </a>
      </div>
    </div>
  );
};

export default InstallPage;
