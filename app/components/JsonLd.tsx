import Script from "next/script"

type Props = {
  schema: Record<string, any> | Record<string, any>[]
  id?: string
}

export default function JsonLd({ schema, id }: Props) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
