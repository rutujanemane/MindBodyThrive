# Mind Body Thrive

Mind Body Thrive provides a way for users to track their workouts, calories burned, and nutritional intake and get insights about the likelihood of gaining or losing weight.
It also provides two means of mental health support, accountability, and social interactions. In Mind Body Thrive, users can get advice and have discussions from a conversational chatbot. As a means of peer and social interaction, finding others with similar interests, and sharing their progress, users can join groups with similar interests and support each other to attain their fitness goals.

## Features

**User Authentication**: Users sign in through PropelAuth, ensuring secure access to personalized data. If a user is not signed in, they are redirected to the home page.

**Dashboard**: Upon logging in, users are directed to a dashboard where they can see their total calorie intake, total calories burned, and total workout duration. This information is pulled from Firebase and updated in real-time.

**Tracking**: Users can track their gym workouts, calories burned, and nutritional intake. This ensures they can visualize calorie intake vs calories burned to see if they are attaining their goals.

**Groups**: users can create/join groups with similar interests. Within each group, users can have conversations with each other. This serves as a means of accountability, social support, and collaborative growth in their wellness journey.

Conversational Chatbot: Users can also interact with the app in a conversational manner, enabling them to get advice about work routines, nutrition, or mental health.
**Tracking and Insights**:
Users log food intake and workouts, with calories and duration stored in Firebase.
The app calculates potential weight gain/loss projections based on caloric intake vs. burn rates and displays the results through visual charts.
Users can view weekly summaries, trends, and insights to understand their progress better and make adjustments to their routines.

**Visual Feedback**: The app utilizes Chart.js to provide two key visual insights:
Projected weight gain if a calorie surplus is detected.
Projected weight loss if there is a calorie deficit.
These projections, shown in a line chart format, allow users to visualize trends over weeks, helping them stay motivated and informed.

**UI and User Experience**: Sidebar navigation allows users to easily switch between different areas of the app. Intuitive UI elements, such as progress circles and icon-labeled cards, make the app easy to use. Tailwind CSS styling ensures the app is visually appealing and fully responsive across devices.
