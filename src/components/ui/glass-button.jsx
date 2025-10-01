import { Button as ShadCNButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function GlassButton(props) {
  return (
    <ShadCNButton
      {...props} // 👈 बाकी सब props भी forward होंगे (onClick, children वगैरह)
      className={cn(
        "rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all",
        props.className
      )}
    />
  )
}
