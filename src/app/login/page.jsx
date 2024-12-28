import Button from "../../components/button";
import Form from "../../components/form";
export default function Login() {
  return (
    <div className="w-full flex items-center justify-center flex-col h-screen">
      <Form title="Login">
        <Button type="Submit" title="Connect To MetaMask" />
      </Form>
    </div>
  );
}
