// Mock authentication service for development
const authService = {
  login: async (email, password) => {
    console.log(`Mock login with email: ${email}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful response
    return {
      success: true,
      user: {
        id: "user123",
        name: "Test User",
        email: email,
        avatar: "https://ui-avatars.com/api/?name=Test+User&background=random"
      },
      token: "mock-jwt-token-for-development"
    };
  },
  
  signup: async (name, email, password) => {
    console.log(`Mock signup with name: ${name}, email: ${email}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful response
    return {
      success: true,
      user: {
        id: "user123",
        name: name,
        email: email,
        avatar: "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=random"
      },
      token: "mock-jwt-token-for-development"
    };
  },
  
  logout: async () => {
    console.log("Mock logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    return { success: true };
  },
  
  requestPasswordReset: async (email) => {
    console.log(`Mock password reset request for email: ${email}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },
  
  resetPassword: async (token, password) => {
    console.log(`Mock password reset with token: ${token}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

export default authService;
