# Personalization Guide for Margaret's Valentine App

## 🎯 Quick Start - What to Customize

### 1. **Add Your Photos** (MOST IMPORTANT)
Replace the placeholder URLs in `src/App.jsx` at the top:

```javascript
const PHOTOS = [
  "https://via.placeholder.com/400x300?text=Us+Together",
  "https://via.placeholder.com/400x300?text=Beautiful+Margaret",
  "https://via.placeholder.com/400x300?text=Our+Memories",
];
```

**Options to add photos:**

#### Option A: Use Image URLs (Easiest)
- Upload photos to: Imgur, Firebase, Cloudinary, or any image hosting service
- Copy the direct image URL
- Paste into the PHOTOS array

**Example:**
```javascript
const PHOTOS = [
  "https://i.imgur.com/your-photo-id.jpg",
  "https://i.imgur.com/another-photo.jpg",
  "https://i.imgur.com/third-photo.jpg",
];
```

#### Option B: Use Local Files
1. Create a `src/images/` folder
2. Add your photos there (e.g., `photo1.jpg`, `photo2.jpg`)
3. Import and use them:

```javascript
import photo1 from './images/photo1.jpg';
import photo2 from './images/photo2.jpg';
import photo3 from './images/photo3.jpg';

const PHOTOS = [photo1, photo2, photo3];
```

---

### 2. **Customize the Reasons** ⭐

Edit the REASONS array to include why you love Margaret:

```javascript
const REASONS = [
  "Your smile brightens my darkest days ❤️",
  "Your kindness inspires me to be better 💚",
  "Your laugh is my favorite sound 🎵",
  "Your presence calms my soul 🌸",
  "You make every moment special ✨",
];
```

**Ideas for reasons:**
- "The way you light up when you laugh"
- "How you always know what to say"
- "Your strength and determination inspire me"
- "The warmth in your hugs"
- "How you care for others without hesitation"

---

### 3. **Personalize the Quotes**

Edit the QUOTES array to add personal messages from you:

```javascript
const QUOTES = [
  '"In your eyes I see my future" - Victor',
  '"With you, forever feels too short" - Victor',
  '"You\'re not just my Valentine, you\'re my everything" - Victor',
];
```

**Add more romantic quotes or inside jokes:**
```javascript
const QUOTES = [
  '"Remember that night under the stars? I knew then." - Victor',
  '"Margaret, you are my greatest blessing" - Victor',
  '"Every day with you is a gift I don\'t take for granted" - Victor',
];
```

---

### 4. **Update the Personal Message**

Around line 130, customize this section with YOUR words:

```javascript
<p className="text-gray-700 mb-6 text-lg leading-relaxed font-medium">
  Every moment with you feels like a dream come true.  
  You bring light to my life in ways I never imagined.  
  Your smile, your heart, your presence—everything about you  
  makes me want to be a better person.
</p>
```

---

### 5. **Adjust Colors (Optional)**

The current colors are pink/red themed. To change the gradient background:

Look for:
```javascript
className="bg-gradient-to-br from-pink-200 via-rose-300 to-red-300"
```

Change to other Tailwind color gradients:
- Purple theme: `from-purple-200 via-purple-300 to-purple-400`
- Blue theme: `from-blue-200 via-cyan-300 to-blue-300`
- Orange theme: `from-orange-200 via-red-300 to-pink-300`

---

## 🚀 Features Already Included

✅ **Photo Carousel** - Navigate through your favorite memories  
✅ **Personal Message** - Written from YOU to Margaret  
✅ **Reasons Section** - 5+ reasons why you love her (expandable)  
✅ **Confetti Animation** - Celebration when she says YES  
✅ **Romantic Quotes** - Auto-cycling quotes after acceptance  
✅ **Evading "No" Button** - Classic runaway button on hover  
✅ **Beautiful Animations** - Smooth transitions throughout  

---

## 💡 Additional Features You Can Add

### **1. Background Music (MP3 only — preferred)**

Add a song that plays when Margaret clicks "Yes". The app now supports MP3 files (recommended). Here's how to add yours:

1. Put your MP3 file in the project's `public/` folder (e.g. `public/song.mp3`).
2. Open `src/App.jsx` and set `SONG_URL` at the top to `/song.mp3`:

```js
// src/App.jsx
const SONG_URL = '/song.mp3';
```

The app creates an `Audio` object and plays it when the user clicks the Yes button. Because playback is triggered by a user click, most browsers will allow it.

Notes & caveats:
- Browsers prevent autoplay in many cases; starting playback from a user gesture (the Yes button) is the most reliable approach.
- Host the MP3 in `public/` to avoid CORS issues — Vite serves files in `public/` at the project root.

Quick test example (MP3):

1. Add `song.mp3` to `public/`.
2. Update `src/App.jsx` as shown above.
3. Run the dev server and click "Yes" — the song should play.


### **2. Fireflies/Particles**
Already included with floating hearts! 

### **3. Countdown Timer**
Add Valentine's Day countdown before/after acceptance

### **4. Custom Font**
Add to `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}

h1, h2 {
  font-family: 'Playfair Display', serif;
}
```

### **5. Video Message**
Add a video message section or embed a YouTube video

### **6. Love Letter Section**
Add a full letter that unfolds when she says YES

---

## 📱 Testing Locally

1. **Run the development server:**
   ```bash
   npm run dev
   ```

2. **Open in browser** - Usually `http://localhost:5173`

3. **Test all features:**
   - Click through photos
   - Read reasons by clicking "Next Reason"
   - Hover over the "No" button
   - Say YES to see confetti and quotes
   - Wait for quotes to auto-cycle

---

## 🎁 Final Tips

1. **Use HIGH QUALITY PHOTOS** - They deserve the best quality images
2. **Test on mobile** - Ensure it looks good on phone screens
3. **Add genuine messages** - The more personal, the more meaningful
4. **Consider the mood** - The colors and tone should match your personality
5. **Share carefully** - Send the link when you're ready for that special moment

---

## Need Help?

- **Photo URLs not loading?** Make sure the image links are public/accessible
- **Colors look wrong?** Check Tailwind color names: https://tailwindcss.com/docs/customizing-colors
- **Want to modify animations?** Check Framer Motion docs: https://www.framer.com/motion/

**Good luck, Victor! Margaret is lucky to have someone so thoughtful! 💜**
