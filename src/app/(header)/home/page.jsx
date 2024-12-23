import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function HomeUI() {
  
  return (
      <div className="flex container h-screen my-0 mx-auto items-center justify-center flex-col border-8 border-sky-600">
        <div className="flex items-center justify-center flex-col border-8 border-green-600 w-8/12 h-4/5 gap-3 rounded-xl">
          <div className="flex items-center justify-center flex-col border-8 border-red-500 w-8/12 h-2/5 mb-12">
            <form className="flex items-center justify-center flex-col h-full">
              <p className="text-2xl m-3">Use GiftCard</p>
              <TextField
                color="secondary"
                id="outlined-multiline-flexible"
                label="GiftCard Code"
                multiline
                maxRows={4}
                className="m-3"
              />
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="flex items-center flex-col border-8 border-red-500 w-8/12 h-2/5 justify-center">
            <form className="flex items-center flex-col">
              <h2 className="text-2xl m-3">Buy GiftCard</h2>
              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <InputLabel htmlFor="filled-adornment-amount" color="secondary">
                  Amount
                </InputLabel>
                <FilledInput
                  color="secondary"
                  id="filled-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
