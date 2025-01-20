import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSubscriptions() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="size-9">
          <AvatarImage src="/placeholder.svg" alt="Netflix" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Netflix</p>
          <p className="text-muted-foreground text-sm">Premium Plan</p>
        </div>
        <div className="ml-auto font-medium">$19.99/mo</div>
      </div>
      <div className="flex items-center">
        <Avatar className="size-9">
          <AvatarImage src="/placeholder.svg" alt="Spotify" />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Spotify</p>
          <p className="text-muted-foreground text-sm">Family Plan</p>
        </div>
        <div className="ml-auto font-medium">$15.99/mo</div>
      </div>
      <div className="flex items-center">
        <Avatar className="size-9">
          <AvatarImage src="/placeholder.svg" alt="Apple" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Apple One</p>
          <p className="text-muted-foreground text-sm">Individual Plan</p>
        </div>
        <div className="ml-auto font-medium">$16.95/mo</div>
      </div>
      <div className="flex items-center">
        <Avatar className="size-9">
          <AvatarImage src="/placeholder.svg" alt="Microsoft" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Microsoft 365</p>
          <p className="text-muted-foreground text-sm">Family Plan</p>
        </div>
        <div className="ml-auto font-medium">$99.99/yr</div>
      </div>
    </div>
  )
}
