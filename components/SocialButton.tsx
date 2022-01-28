import { Link, Button } from "@chakra-ui/react";

type Prop = {
  link: string,
  icon: any,
}

export default function SocialButton({ link, icon }: Prop) {
  return (
    <Button variant="ghost" size="md" as={Link} href={link}>
      {icon}
    </Button>
  )
}
