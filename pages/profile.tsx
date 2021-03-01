// import type { GetStaticPropsContext } from 'next'

import { Layout } from '@components/core'
import { Container, Text } from '@components/ui'
import { useRouter } from 'next/router'

export default function Profile() {
  const { locale } = useRouter()

  const data = null
  return (
    <Container>
      <Text variant="pageHeading">{locale === "pt" ? "Perfil" : "My Profile"}</Text>
      {data && (
        // <div className="grid lg:grid-cols-12">
        //   <div className="lg:col-span-8 pr-4">
        //     <div>
        //       <Text variant="sectionHeading">Full Name</Text>
        //       <span>{data.firstName} {data.lastName}</span>
        //     </div>
        //     <div className="mt-5">
        //       <Text variant="sectionHeading">Email</Text>
        //       <span>{data.email}</span>
        //     </div>
        //   </div>
        // </div>
      )}
    </Container>
  )
}

Profile.Layout = Layout
