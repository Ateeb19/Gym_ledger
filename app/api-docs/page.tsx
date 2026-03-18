import spec from "@/swagger.json";
import SwaggerUIComponent from "@/components/SwaggerUIComponent";

export default function ApiDocs() {
  return <SwaggerUIComponent spec={spec} />;
}