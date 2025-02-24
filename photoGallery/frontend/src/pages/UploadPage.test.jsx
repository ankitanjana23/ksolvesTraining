
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UploadPage from "../pages/UploadPage";
import axios from "axios";

describe('Group of Test' , () =>{
     test('render upload form , button , sorting , searching ,UploadImage , next , previews ' , () =>{
          render(<UploadPage/>)
          expect(screen.getByText("Image Upload & Gallery")).toBeInTheDocument()
          expect(screen.getByRole("button", { name: "Upload" })).toBeInTheDocument();  
          expect(screen.getByText("Newest First")).toBeInTheDocument()
          expect(screen.getByPlaceholderText("search image...")).toBeInTheDocument()
          expect(screen.getByRole("button" , {name:"Previous"})).toBeInTheDocument()
          expect(screen.getByRole("button" , {name:"Next"})).toBeInTheDocument()
     })

     test('fetch and display images' , async () =>{
          render(<UploadPage/>)
          await waitFor(() => expect(screen.getByText("Screenshot from 2025-02-11 10-53-42.png")).toBeInTheDocument())
          // await waitFor(() => expect(screen.getByText("Screenshot from 2025-02-18 15-56-35.png")).toBeInTheDocument())
     })

     test('disable upload button no file select' , ()=>{
          render(<UploadPage/>)
          expect(screen.getByRole('button' , {name:"Upload"})).not.toBeEnabled();
     })
})

