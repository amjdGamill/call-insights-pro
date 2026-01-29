import { useState } from "react";
import { Heart, Phone, Trash2 } from "lucide-react";
import { Waveform } from "../Waveform";

interface FavoriteCall {
  id: string;
  name: string;
  number: string;
  duration: string;
  date: string;
}

const initialFavorites: FavoriteCall[] = [
  { id: "1", name: "أحمد محمد", number: "+966 50 123 4567", duration: "5:23", date: "اليوم" },
  { id: "2", name: "فاطمة أحمد", number: "+966 56 321 0987", duration: "8:12", date: "أمس" },
  { id: "3", name: "خالد عبدالله", number: "+966 55 111 2222", duration: "15:45", date: "منذ يومين" },
  { id: "4", name: "نورة سعيد", number: "+966 54 333 4444", duration: "3:18", date: "منذ 3 أيام" },
];

export function FavoritesScreen() {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-32">
      {/* Header */}
      <header className="px-5 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Heart className="w-6 h-6 text-accent fill-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">المفضلة</h1>
            <p className="text-muted-foreground">{favorites.length} تسجيل محفوظ</p>
          </div>
        </div>
      </header>

      {/* Favorites List */}
      <div className="px-5">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد مفضلات</h3>
            <p className="text-muted-foreground max-w-xs">
              أضف مكالماتك المهمة إلى المفضلة للوصول إليها بسرعة
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((favorite, index) => (
              <div
                key={favorite.id}
                className="glass-card p-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-accent">
                      {favorite.name.charAt(0)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-foreground truncate">{favorite.name}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {favorite.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground" dir="ltr">
                      {favorite.number}
                    </p>

                    {/* Waveform */}
                    <div className="mt-3">
                      <Waveform bars={30} />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                          <Phone className="w-5 h-5" />
                        </button>
                        <span className="text-sm font-medium text-muted-foreground">
                          {favorite.duration}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFavorite(favorite.id)}
                        className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
