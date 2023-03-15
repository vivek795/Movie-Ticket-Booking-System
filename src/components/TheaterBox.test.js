import React from "react";
import {render, screen} from "@testing-library/react";
// import Enzyme, {render, shallow} from "enzyme";
// import Adapter from 'enzyme-adapter-react-16';
import TheaterBox from "./TheaterBox";
// Enzyme.configure({adapter : new Adapter() });


describe("testing of the theatre box unit", () => {
    
    it("searching for specific test id in unit", () => {
        
        render(<TheaterBox name="None"/>);
    
        const testElement = screen.getByText("None");
    
        expect(testElement).toBeInTheDocument();
        expect(testElement).toHaveTextContent("None");

    });
}); 