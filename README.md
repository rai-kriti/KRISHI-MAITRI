# KRISHI-MAITRI
FULLSTACK REPO

structure 
.
├── .gitignore
├── LICENSE
├── README.md
│
├── backend
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── chatbotController.js
│   │   ├── priceController.js
│   │   └── suggestionController.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── chatbotRoutes.js
│   │   ├── msp.routes.js
│   │   ├── prices.js
│   │   ├── suggestion.js
│   │   └── userRoutes.js
│   │
│   ├── models
│   │   ├── ChatLog.js
│   │   ├── CropRule.js
│   │   ├── Farmer.js
│   │   ├── MSPPrice.js
│   │   └── Price.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── firebase
│   │   └── firebase.js
│   │
│   ├── utils
│   │   └── cache.js
│   │
│   ├── scripts
│   │   └── sync-msp.js
│   │
│   ├── seeds
│   │   ├── seedCropRules.js
│   │   └── seedPrices.js
│   │
│   ├── uploads
│   │   ├── 0e805d213b862ba0e74010556da90d3f
│   │   ├── 28e91b04c137228ae2b604cca5d5ba5a
│   │   └── 8daf272d3c4fa1e0fdae125d5f1321bc
│   │
│   └── listGroqModels.js
│
└── frontend
    ├── .gitignore
    ├── README.md
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── eslint.config.js
    ├── index.html
    │
    ├── public
    │   ├── vdobg.mp4
    │   └── vite.svg
    │
    └── src
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── firebase.js
        │
        ├── assets
        │   └── react.svg
        │
        ├── components
        │   ├── FloatingChatButton.jsx
        │   ├── ProtectedRoute.jsx
        │   │
        │   ├── widgets
        │   │   ├── ChatbotWidget.jsx
        │   │   └── MSPWidget.jsx
        │   │
        │   └── msp
        │       ├── CropList.jsx
        │       ├── CropTrendDrawer.jsx
        │       ├── HeroMSPCarousel.jsx
        │       ├── MSPCropList.jsx
        │       ├── MSPHeader.jsx
        │       ├── MSPTopCharts.jsx
        │       ├── SeasonSwitch.jsx
        │       └── TopCropsBarChart.jsx
        │
        ├── pages
        │   ├── Auth.jsx
        │   ├── ChatbotPage.jsx
        │   ├── Dashboard.jsx
        │   ├── Landing.jsx
        │   ├── MSPPage.jsx
        │   ├── Onboarding.jsx
        │   └── Profile.jsx
        │
        └── utils
            └── auth.js
