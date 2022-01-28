import { Link, Button } from "@chakra-ui/react";

type Prop = {
  link: string,
  icon: any,
};

export default function SocialButton({ link, icon }: Prop) {
  return (
    <Link href={link} isExternal>
      <Button variant="ghost" size="md">
        {icon}
      </Button>
    </Link>
  )
}
