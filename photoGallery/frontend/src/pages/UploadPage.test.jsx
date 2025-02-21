import UploadPage from "./UploadPage";
import axios from "axios";
import { render , screen } from "@testing-library/react";

test('render upload button' , () =>{
     render(<UploadPage/>)
     const buttonElement = screen.getByText("Upload")
     expect(buttonElement).toBeInTheDocument()
})