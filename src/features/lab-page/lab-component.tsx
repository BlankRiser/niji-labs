import { labComponentsRoute } from "@/router/non-auth-routes"

export const LabComponent = () => {
    const params = labComponentsRoute.useParams()
    console.log( params )
  return (
    <div>LabComponent: {params.component}</div>
  )
}