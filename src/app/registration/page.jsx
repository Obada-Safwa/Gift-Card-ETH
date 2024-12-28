import Button from "../../components/button";
import Form from "../../components/form";
import FormChildren from "../../components/formchildren";

export default function Registration() {
  return (
    <div className="w-full flex items-center justify-center flex-col h-screen">
      <Form title="Create Account">
        <div className="mb-4">
          <FormChildren type="textField" label="Name" />
        </div>

        <FormChildren type="select" />

        <div className="mb-1" />
        <div className="flex items-center justify-center gap-2 ">
          <Button title="Link Account" type="button" />
          <Button title="Submit" type="submit" />
        </div>
      </Form>
    </div>
  );
}
