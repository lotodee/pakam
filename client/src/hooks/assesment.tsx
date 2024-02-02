import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";



  export const getAssessment = async (user) => {

   
    try {
      const response = await fetch(
        `http://localhost:5000/api/assessment/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${user?.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        // Handle the error, e.g., show an error message or take appropriate action
        const errorData = await response.json();
        console.error("Error fetching account data:", errorData);
      } else {
        const data = await response.json();
        return data
      }
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  
  };


  export const createAssessment = async (name, description, quantity,user) => {
  

    try {
      const response = await fetch("http://localhost:5000/api/assessment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          name,
          description,
          quantity,
        }),
      });
  
      if (!response.ok) {
        // Handle the error, e.g., show an error message or take appropriate action
        const errorData = await response.json();
        console.error("Error creating assessment:", errorData);
      } else {
        const data = await response.json();
        console.log("Assessment created successfully:", data);
        return data;
      }
    } catch (error) {
      console.error("Error creating assessment:", error);
    }
  };
  



  export const updateAssessment = async (
    name: string | undefined,
    description: string | undefined,
    quantity: string | undefined,
    user: { accessToken?: string | null },
    id: string
  ) => {
    try {
      const body: any = {};
  
      // Add properties to the request body only if they are provided
      if (name) {
        body.name = name;
      }
      if (description) {
        body.description = description;
      }
      if (quantity) {
        body.quantity = quantity;
      }
  
      const response = await fetch(`http://localhost:5000/api/assessment/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${user?.accessToken || ''}`,
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating assessment:", errorData);
      } else {
        const updatedAssessment = await response.json();
        console.log("Assessment updated successfully:", updatedAssessment);
        return updatedAssessment;
      }
    } catch (error) {
      console.error("Error updating assessment:", error);
    }
  };
  

export const deleteAssessment = async ( user,id) => {
  

  try {

console.log(user)
    const response = await fetch(`http://localhost:5000/api/assessment/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${user?.accessToken}`,
      },
 
    });

    if (!response.ok) {
  
      const errorData = await response.json();
      console.error("Error deleting assessment:", errorData);
    } else {
      const updatedAssessment = await response.json();
      console.log("Assessment deleted successfully:", updatedAssessment);
      return updatedAssessment;
    }
  } catch (error) {
    console.error("Error deleting assessment:", error);
  }
};


