const signup = async (req , res)=> {
    try {
         const { fullName, email, password , bio } = req.body;

        // Validate required fields
        if (![fullName, email, password , bio].every((field) => field && field.trim())) {
            return res.status(400).json(new ApiError(400, "All fields are required"));
        }
    } catch (error) {
        
    }
}



//all controllers export heare

export {
    signup
}