/** @type {import('tailwindcss').Config} */
module.exports = { 
  content: [
    //'./src/**/*.{html,ejs,js}',
    './views/**/*.{html,ejs,js}',
    //'./public/*.{html,ejs,js}',
  ],
  theme: {
  },
  daisyui: {
    themes: [
      {
        // mytheme: {        
        //   "primary": "#2563eb",                  
        //   "secondary": "#7dd3fc",                  
        //   "accent": "#37CDBE",                  
        //   "neutral": "#3D4451",                  
        //   "base-100": "#FFFFFF",                  
        //   "info": "#3ABFF8",                  
        //   "success": "#36D399",                  
        //   "warning": "#FBBD23",                  
        //   "error": "#F87272",
        // },
        mytheme: {          
    
          "primary": "#3D51A1",
          
          "secondary": "#7383C5",

          "secondary-content": "#FFFFFF",
                   
          "accent": "#EDBB46",
                   
          "neutral": "#3D4451",
                   
          "base-100": "#FFFFFF",
                   
          "info": "#3ABFF8",
                   
          "success": "#36D399",
                   
          "warning": "#FBBD23",
                   
          "error": "#F87272",

        },
      },
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
}
