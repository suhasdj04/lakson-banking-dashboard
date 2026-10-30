import * as React from 'react';
import * as Menu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

export const DropdownMenu = Menu.Root;
export const DropdownMenuTrigger = Menu.Trigger;
export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof Menu.Item>,
  React.ComponentPropsWithoutRef<typeof Menu.Item>
>(({ className, ...props }, ref) => (
  <Menu.Item
    ref={ref}
    className={cn('relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none transition focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className)}
    {...props}
  />
));
DropdownMenuItem.displayName = Menu.Item.displayName;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof Menu.Content>,
  React.ComponentPropsWithoutRef<typeof Menu.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <Menu.Portal>
    <Menu.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn('z-[70] min-w-[220px] overflow-hidden rounded-2xl border border-line bg-white p-1.5 text-foreground shadow-xl outline-none animate-in fade-in-0 zoom-in-95 dark:bg-[#151c18]', className)}
      {...props}
    />
  </Menu.Portal>
));
DropdownMenuContent.displayName = Menu.Content.displayName;
