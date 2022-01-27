import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client";
import {
  Heading,
  Link,
  ListItem,
  OrderedList,
  UnorderedList,
  Table,
  Thead,
  Tbody,
  Checkbox,
  Td,
  Th,
  Tr,
  Text
} from "@chakra-ui/react";

type Prop = {
  code: string,
  frontMatter: any,
}

const components: any = {
  h1: (props: any) => <Heading fontSize="4xl" {...props} />,
  h2: (props: any) => <Heading fontSize="3xl" {...props} />,
  h3: (props: any) => <Heading fontSize="2xl" {...props} />,
  h4: (props: any) => <Heading fontSize="xl" {...props} />,
  h5: (props: any) => <Heading fontSize="lg" {...props} />,
  h6: (props: any) => <Heading fontSize="md" {...props} />,
  a: (props: any) => <Link {...props} />,
  ul: (props: any) => <UnorderedList {...props} />,
  ol: (props: any) => <OrderedList {...props} />,
  li: (props: any) => <ListItem {...props} />,
  table: (props: any) => <Table {...props} />,
  thead: (props: any) => <Thead {...props} />,
  tbody: (props: any) => <Tbody {...props} />,
  td: (props: any) => <Td {...props} />,
  th: (props: any) => <Th {...props} />,
  tr: (props: any) => <Tr {...props} />,
  input: (props: any) => <Checkbox isDisabled defaultIsChecked={props.checked} {...props} />,
  p: (props: any) => <Text {...props} />,
}

export default function BlogPost({code, frontMatter}: Prop) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <Component components={components} />
  )
}