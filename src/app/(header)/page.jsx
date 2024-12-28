import Form from "../../components/form";
import FormChildren from "../../components/formchildren";
import Button from "../../components/button";
import "../globals.css";
import Modal from "../../components/modal";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col w-8/12 h-4/5 rounded-xl mx-auto mt-10 gap-3">
      <Form title="Buy GiftCard" className="w-full">
        <div className="mb-5 flex flex-row">
          <FormChildren type="textField" label="Amount" className="mx-3" />
          <Button title="Buy" type="submit" />
        </div>
      </Form>

      <Form title="Redeem GiftCard" className="w-full">
        <div className="mb-5 flex flex-row">
          <FormChildren
            type="textField"
            label="GiftCard Code"
            className="mx-3"
          />
          <Button type="submit" title="Redeem" />
        </div>
      </Form>
      <Modal />
    </div>
  );
}
