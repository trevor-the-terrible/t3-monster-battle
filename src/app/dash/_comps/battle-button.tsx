import { Button } from "@/components/ui/button";
import { cn } from "@/app/utils/styles";
import { useEffect, useState, useMemo } from "react";

export const BattleButton = (props: React.ComponentProps<typeof Button> & {
  variant?: "neutral" | "default";
  onClick?: () => void;

  // in ms
  cooldown?: number;
  onCooldownStart?: () => void;
  onCooldownEnd?: () => void;
}) => {
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const interval = setInterval(() => {
      const newCooldown = cooldown - 1000;
      setCooldown(newCooldown);
      if (newCooldown <= 0) {
        props.onCooldownEnd?.();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown, props]);

  const safeProps = useMemo(() => {
    const {
      cooldown,
      onCooldownStart,
      onCooldownEnd,
      ...rest
    } = props;

    return rest;
  }, [props]);

  return (
    <Button
      variant={props.variant ?? "neutral"}
      className={cn("cursor-pointer", props.className)}
      disabled={cooldown > 0}
      {...safeProps}
      onClick={() => {
        if (cooldown > 0) {
          return;
        }

        setCooldown(props.cooldown ?? 5000);
        props.onClick?.();
        props.onCooldownStart?.();
      }}
    >
      {props.children}

      {cooldown > 0 && (
        <span className="text-xs text-red-500">
          {cooldown / 1000}s
        </span>
      )}
    </Button>
  );
};
