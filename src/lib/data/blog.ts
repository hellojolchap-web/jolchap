import type { Author, BlogPost } from "@/types";

/** Editorial authors. */
const authors: Record<string, Author> = {
  ria: {
    name: "Ria Haque",
    role: "Design Lead, Jolchap",
    avatar: "/images/authors/ria-haque.webp",
  },
  imran: {
    name: "Imran Kabir",
    role: "Print Production Manager",
    avatar: "/images/authors/imran-kabir.webp",
  },
  sabbir: {
    name: "Sabbir Ahmed",
    role: "Founder, Jolchap",
    avatar: "/images/authors/sabbir-ahmed.webp",
  },
  editorial: {
    name: "The Jolchap Journal",
    role: "Editorial Team",
    avatar: "/images/authors/jolchap-editorial.webp",
  },
};

/**
 * Default published articles. These render the blog out-of-the-box and seed the
 * `blog_posts` table. Content is genuine print & personalisation advice — no
 * placeholder copy.
 */
export const blogPosts: BlogPost[] = [
  {
    id: "post-how-to-design-the-perfect-custom-stamp",
    slug: "how-to-design-the-perfect-custom-stamp",
    title: "How to Design the Perfect Custom Stamp",
    excerpt:
      "A great stamp is small, but the design decisions behind it aren't. Here's how to lay out text, choose a size, and prepare artwork so your impression lands crisp every single time.",
    coverImage: "/images/blog/how-to-design-the-perfect-custom-stamp.webp",
    category: "Guide",
    tags: ["stamps", "design", "branding"],
    author: authors.imran,
    readingTime: 6,
    publishedAt: "2026-04-18",
    featured: true,
    content: `
<p>A custom stamp is one of the cheapest pieces of branding you'll ever buy and one of the most used. It signs off invoices, seals parcels, marks attendance and stamps the back of a business card. Because it's small, every millimetre of the design has to earn its place. Here's how we approach it at the studio.</p>
<h2>Decide what the stamp must do first</h2>
<p>Before any artwork, write down the job. An office approval stamp needs a date line and clear "APPROVED" text. A small-business logo stamp needs your mark plus maybe a website. A return-address stamp is all text. The function decides the shape, the size and how much you can fit.</p>
<h2>Keep the layout breathable</h2>
<p>The most common mistake we see is cramming. A stamp impression is not a poster — fine detail clogs with ink and disappears. Follow a few rules:</p>
<ul>
<li>Use bold, simple typefaces. Thin scripts and hairline serifs break up at stamp scale.</li>
<li>Keep text at 8pt or larger for reliable impressions.</li>
<li>Leave clear space around every element so ink doesn't bridge the gaps.</li>
<li>Avoid solid filled blocks larger than a thumbnail — they smear and dry unevenly.</li>
</ul>
<h2>Pick a size that matches the surface</h2>
<p>A 38mm round suits a logo with a ring of text. A 58 x 22mm rectangle is the workhorse for address and signature stamps. If you're stamping small items like jewellery tags or thank-you cards, go smaller and simpler. When in doubt, send us the artwork and we'll recommend the size.</p>
<blockquote>A stamp should read in a glance and survive a thousand impressions. If a detail won't show at arm's length, leave it out.</blockquote>
<h2>Send us the right file</h2>
<p>Vector artwork (AI, EPS or PDF) gives the sharpest result because it stays crisp at any size. If you only have a logo as a photo or screenshot, a high-resolution black-and-white version still works — we'll clean it up. One-colour, high-contrast art always stamps best.</p>
<p>Not sure where to start? Tell us what you need the stamp to do and we'll mock up a layout for you before anything is made. A few minutes of planning is the difference between a stamp you love and one that lives in a drawer.</p>
`,
  },
  {
    id: "post-rubber-vs-self-inking-stamps",
    slug: "rubber-vs-self-inking-stamps",
    title: "Rubber vs Self-Inking Stamps: Which Should You Choose?",
    excerpt:
      "Traditional rubber stamp with a separate pad, or an all-in-one self-inking model? Each has a place. Here's how to pick the right one for how often you'll actually use it.",
    coverImage: "/images/blog/rubber-vs-self-inking-stamps.webp",
    category: "Guide",
    tags: ["stamps", "office", "buying-guide"],
    author: authors.imran,
    readingTime: 5,
    publishedAt: "2026-02-12",
    featured: false,
    content: `
<p>"Should I get a rubber stamp or a self-inking one?" is the question we field most often at the counter. They both put your mark on paper, but they suit very different routines. Here's the honest breakdown.</p>
<h2>Traditional rubber stamps</h2>
<p>This is the classic: a rubber die mounted on a wooden or acrylic handle, pressed onto a separate ink pad. It's simple, durable and flexible — you can switch ink colours just by switching pads, and the die itself lasts for years.</p>
<p>It shines when you stamp occasionally, want to change colours often, or need a large or unusually shaped impression. The trade-off is speed: every impression needs a trip to the pad, and results vary with how evenly you ink.</p>
<h2>Self-inking stamps</h2>
<p>A self-inking stamp houses the die and an ink pad in one spring-loaded body. Press down, the die flips onto the internal pad and back onto the paper in one motion. It's fast, clean and consistent — ideal for repetitive stamping.</p>
<ul>
<li><strong>Speed:</strong> thousands of impressions without a separate pad.</li>
<li><strong>Consistency:</strong> even ink coverage every time.</li>
<li><strong>Refillable:</strong> a few drops of ink and it's good for thousands more.</li>
</ul>
<h2>So which one?</h2>
<p>Match the tool to the volume:</p>
<ol>
<li><strong>Occasional or creative use</strong> (crafts, thank-you cards, colour changes) — go traditional rubber.</li>
<li><strong>Daily office use</strong> (invoices, approvals, addresses) — go self-inking.</li>
<li><strong>Very large or pre-inked one-off marks</strong> — ask us; specialty options exist.</li>
</ol>
<blockquote>Buy for how you'll really use it, not how you imagine you will. Most offices regret a rubber stamp by the hundredth invoice.</blockquote>
<h2>A note on ink</h2>
<p>Whichever you choose, match the ink to the surface. Standard water-based ink is fine for paper; non-porous surfaces like plastic or glossy stock need a specialist ink. Tell us where you're stamping and we'll set you up correctly.</p>
`,
  },
  {
    id: "post-wax-seals-for-weddings",
    slug: "wax-seals-for-weddings",
    title: "Wax Seals: The Detail That Elevates Wedding Invitations",
    excerpt:
      "Nothing makes an invitation feel handmade quite like a wax seal. Here's how they work, which colours suit which palettes, and how to apply them without melting your nerves.",
    coverImage: "/images/blog/wax-seals-for-weddings.webp",
    category: "Ideas",
    tags: ["wax-seals", "wedding", "stationery"],
    author: authors.ria,
    readingTime: 6,
    publishedAt: "2025-11-14",
    featured: true,
    content: `
<p>Open an envelope with a wax seal pressed into it and you slow down. It signals that someone cared enough to finish the piece by hand. For weddings in particular, a seal turns a printed card into a keepsake — and it's far easier to do than people expect.</p>
<h2>How a wax seal actually works</h2>
<p>You melt sealing wax, pour a small pool onto the paper, and press a brass die — usually engraved with a monogram, motif or date — into it. As it cools, your design is captured in relief. We engrave custom dies from your initials, your wedding logo, or a simple botanical motif.</p>
<h2>Choosing wax and colour</h2>
<p>Modern flexible wax (often a glue-gun format) is more forgiving than old-school brittle stick wax — it won't crack in the post. For colour, take your cue from the invitation:</p>
<ul>
<li><strong>Deep burgundy or oxblood</strong> — rich, traditional, gorgeous against cream stock.</li>
<li><strong>Sage and eucalyptus tones</strong> — perfect for garden and botanical themes.</li>
<li><strong>Gold, copper or champagne</strong> — formal and luminous, beautiful for evening events.</li>
<li><strong>Dusty blue or blush</strong> — soft and contemporary.</li>
</ul>
<h2>Apply them like a pro</h2>
<ol>
<li>Warm the die slightly less than you think — a cool die releases cleaner, sharper detail.</li>
<li>Pour a consistent amount of wax so every seal is the same size.</li>
<li>Press straight down, hold for a few seconds, then lift straight up.</li>
<li>For mailing, attach seals to the flap with care, or apply self-adhesive seals made in advance.</li>
</ol>
<blockquote>For a large guest list, make your seals ahead of time on baking paper and stick them on later. Your hands — and your timeline — will thank you.</blockquote>
<h2>Make it part of the whole suite</h2>
<p>A seal feels most considered when it echoes the rest of the stationery — the same monogram on your invitation, place cards and thank-you notes. We can design the motif once and carry it across everything, so the wax seal is the finishing note, not an afterthought.</p>
`,
  },
  {
    id: "post-custom-tshirt-printing-methods",
    slug: "custom-tshirt-printing-methods",
    title: "Screen Print vs DTG vs Vinyl: T-Shirt Printing Explained",
    excerpt:
      "Three popular ways to put a design on a tee, three very different results. Here's how each method works and which one fits your design, quantity and budget.",
    coverImage: "/images/blog/custom-tshirt-printing-methods.webp",
    category: "Guide",
    tags: ["t-shirts", "printing", "apparel"],
    author: authors.imran,
    readingTime: 7,
    publishedAt: "2026-01-22",
    featured: false,
    content: `
<p>When customers ask us to print a t-shirt, the first real question is <em>how</em>. Screen printing, direct-to-garment (DTG) and vinyl each have strengths, and choosing the wrong one is how you end up paying too much or getting a result that cracks after a few washes. Here's the plain-language guide.</p>
<h2>Screen printing</h2>
<p>Ink is pushed through a mesh stencil, one screen per colour. Set-up takes time, but once the screens are made, each shirt prints fast and cheap — which is why it's the king of bulk orders.</p>
<ul>
<li><strong>Best for:</strong> larger quantities, bold designs with few colours, team and event shirts.</li>
<li><strong>Feel:</strong> durable, slightly raised, holds up to years of washing.</li>
<li><strong>Watch out:</strong> set-up cost makes small runs expensive per shirt.</li>
</ul>
<h2>Direct-to-garment (DTG)</h2>
<p>A specialised printer sprays the design straight onto the fabric, like an inkjet for clothing. No screens, so there's no set-up cost and no limit on colours.</p>
<ul>
<li><strong>Best for:</strong> small quantities, photo-realistic art, full-colour and gradient designs.</li>
<li><strong>Feel:</strong> soft, printed into the fabric.</li>
<li><strong>Watch out:</strong> works best on cotton; needs quality garments for vivid results.</li>
</ul>
<h2>Heat-transfer vinyl</h2>
<p>A design is cut from coloured vinyl and heat-pressed onto the garment. It's the go-to for names and numbers, and for one-off personalised shirts.</p>
<ul>
<li><strong>Best for:</strong> names, numbers, single shirts, simple bold shapes.</li>
<li><strong>Feel:</strong> smooth and slightly rubbery on the surface.</li>
<li><strong>Watch out:</strong> not ideal for highly detailed or multi-colour artwork.</li>
</ul>
<blockquote>Rule of thumb: many shirts with few colours, screen print. One detailed shirt, DTG. A name on the back, vinyl.</blockquote>
<h2>Still unsure?</h2>
<p>Send us your design and quantity and we'll recommend the method that gives the best result for your budget — sometimes a mix is the answer, like screen-printed fronts with vinyl names on the back for a team. There's no single "best" method, only the best one for your job.</p>
`,
  },
  {
    id: "post-choosing-the-right-tshirt-fabric",
    slug: "choosing-the-right-tshirt-fabric",
    title: "Choosing the Right T-Shirt Fabric for Printing",
    excerpt:
      "The blank tee matters as much as the print. Here's how cotton, blends and the Bangladesh heat factor into a shirt that looks good, prints well and survives the wardrobe.",
    coverImage: "/images/blog/choosing-the-right-tshirt-fabric.webp",
    category: "Tips",
    tags: ["t-shirts", "fabric", "apparel"],
    author: authors.ria,
    readingTime: 5,
    publishedAt: "2025-10-09",
    featured: false,
    content: `
<p>People obsess over the artwork and forget the canvas. The fabric you print on decides how the colours sit, how the shirt feels in Dhaka's heat, and how it holds up after the tenth wash. Here's what to know before you choose a blank.</p>
<h2>100% cotton</h2>
<p>The classic for printing. Cotton takes ink beautifully — especially for DTG and screen printing — and breathes well, which matters a lot in our climate. Look for combed cotton for a smoother surface and a softer hand.</p>
<p>The trade-off: pure cotton can shrink a little on the first wash and wrinkles more. For most custom tees, it's still our default recommendation.</p>
<h2>Cotton-polyester blends</h2>
<p>A blend (often 60/40 or 50/50) adds durability, resists shrinking and wrinkling, and dries faster. The slightly smoother surface suits certain prints well, and the shirts tend to keep their shape over time.</p>
<ul>
<li><strong>Comfort:</strong> a touch less breathable than pure cotton but very wearable.</li>
<li><strong>Durability:</strong> excellent — great for shirts that get heavy use.</li>
<li><strong>Print:</strong> works across methods; vinyl and screen sit nicely.</li>
</ul>
<h2>Weight matters too</h2>
<p>Fabric weight is measured in GSM (grams per square metre):</p>
<ol>
<li><strong>140–160 GSM</strong> — light and airy, ideal for summer and giveaways.</li>
<li><strong>170–190 GSM</strong> — the sweet spot for most custom tees: substantial but comfortable.</li>
<li><strong>200+ GSM</strong> — premium, structured, holds its shape; lovely for brand merch.</li>
</ol>
<blockquote>In Bangladesh's heat, breathability wins. A mid-weight combed cotton is the shirt people actually keep wearing.</blockquote>
<h2>Our advice</h2>
<p>For everyday tees and giveaways, mid-weight combed cotton. For staff uniforms or anything that gets washed constantly, lean toward a blend. Tell us how the shirt will be used and we'll pull the right blank — and you're always welcome to feel samples at the studio before you commit.</p>
`,
  },
  {
    id: "post-personalised-gift-ideas",
    slug: "personalised-gift-ideas",
    title: "25 Personalised Gift Ideas for Every Occasion",
    excerpt:
      "Stuck for a gift that feels thoughtful, not generic? Here are 25 personalised ideas — for birthdays, weddings, new jobs and just-because — that a name, photo or date makes unforgettable.",
    coverImage: "/images/blog/personalised-gift-ideas.webp",
    category: "Ideas",
    tags: ["gifts", "personalisation", "occasions"],
    author: authors.editorial,
    readingTime: 7,
    publishedAt: "2025-12-05",
    featured: true,
    content: `
<p>The best gifts feel like they could only have been for one person. You don't need a big budget for that — you need a name, a date, a photo or an inside joke, and something to put it on. Here are 25 ideas we make all the time, sorted by occasion.</p>
<h2>For birthdays</h2>
<ul>
<li>A photo mug with a favourite memory.</li>
<li>A t-shirt with their age and a cheeky slogan.</li>
<li>A custom name keychain.</li>
<li>A printed canvas of a treasured snapshot.</li>
<li>A personalised notebook with their name embossed.</li>
</ul>
<h2>For couples and weddings</h2>
<ul>
<li>Matching "his and hers" mugs.</li>
<li>A couple tee set with your wedding date.</li>
<li>A framed print of your first message or vows.</li>
<li>A custom wax-seal stamp with the new monogram.</li>
<li>A photo cushion from the big day.</li>
</ul>
<h2>For new jobs and milestones</h2>
<ul>
<li>An engraved pen for a graduation.</li>
<li>A name plate or desk stamp for a promotion.</li>
<li>A printed mug with the company logo for a first day.</li>
<li>A motivational poster for a new home office.</li>
<li>A personalised planner to start the new role.</li>
</ul>
<h2>For new parents and kids</h2>
<ul>
<li>A baby onesie with name and birth date.</li>
<li>A "world's best dad/mum" mug.</li>
<li>A printed growth-chart canvas.</li>
<li>A custom name puzzle.</li>
<li>A photo book of the first year.</li>
</ul>
<h2>Just because</h2>
<ul>
<li>A friendship-anniversary photo collage print.</li>
<li>A tote bag with their favourite quote.</li>
<li>A custom phone case from a shared photo.</li>
<li>A set of personalised coasters.</li>
<li>A "thank you" mug for someone who never asks for anything.</li>
</ul>
<blockquote>A gift doesn't have to be expensive to feel priceless. One real photo or one shared joke does more than any price tag.</blockquote>
<p>Have a person in mind but not a product? Tell us about them and we'll suggest something — and turn it around in time for the occasion.</p>
`,
  },
  {
    id: "post-corporate-gifting-guide",
    slug: "corporate-gifting-guide",
    title: "A Smart Guide to Corporate Gifting",
    excerpt:
      "Done well, a corporate gift strengthens a relationship; done lazily, it ends up in a drawer. Here's how to choose branded gifts that people actually keep and use.",
    coverImage: "/images/blog/corporate-gifting-guide.webp",
    category: "Business",
    tags: ["corporate", "gifting", "branding"],
    author: authors.sabbir,
    readingTime: 6,
    publishedAt: "2026-03-06",
    featured: false,
    content: `
<p>Corporate gifting is one of the highest-return marketing spends there is — when it's done with thought. A useful, well-made branded item sits on a desk for months, quietly reminding someone of your company. A cheap, forgettable one says exactly that about you. Here's how to get it right.</p>
<h2>Start with the relationship, not the logo</h2>
<p>Ask who the gift is for and what they'd genuinely use. A client who travels appreciates a quality water bottle or a smart notebook. A whole team might love branded hoodies they'll actually wear. The logo comes second to usefulness — a gift no one uses is just expensive litter.</p>
<h2>Gifts that consistently land</h2>
<ul>
<li><strong>Drinkware</strong> — branded mugs, tumblers and bottles see daily use.</li>
<li><strong>Apparel</strong> — well-fitted tees, polos and hoodies become favourites.</li>
<li><strong>Stationery</strong> — quality notebooks, pens and planners for the desk.</li>
<li><strong>Tech accessories</strong> — mousepads, cable organisers, laptop sleeves.</li>
<li><strong>Tote bags</strong> — practical, eco-friendly and seen everywhere.</li>
</ul>
<h2>Get the branding tasteful</h2>
<p>Resist the urge to plaster your logo across everything. A subtle, well-placed mark on a genuinely nice item gets used in public; a giant logo on a cheap item gets hidden. Restraint reads as confidence.</p>
<blockquote>The best branded gift is one the recipient would have happily bought themselves. Aim for that and the marketing takes care of itself.</blockquote>
<h2>Plan the logistics early</h2>
<ol>
<li>Confirm quantities and sizes (for apparel) well ahead of the deadline.</li>
<li>Allow time for sampling so you approve quality before the full run.</li>
<li>Factor in packaging — a tidy presentation multiplies the perceived value.</li>
<li>Order a few extras for new hires and last-minute additions.</li>
</ol>
<h2>We can handle the whole run</h2>
<p>From sourcing the items to branding, packing and delivering across Dhaka, we manage corporate orders end to end. Tell us your budget per head and the occasion, and we'll put together options that fit — and that won't end up in a drawer.</p>
`,
  },
  {
    id: "post-branding-your-small-business",
    slug: "branding-your-small-business",
    title: "Branding Your Small Business on a Budget",
    excerpt:
      "You don't need an agency retainer to look professional. Here's a practical, low-cost branding checklist that helps a small Dhaka business look established from day one.",
    coverImage: "/images/blog/branding-your-small-business.webp",
    category: "Business",
    tags: ["branding", "small-business", "budget"],
    author: authors.sabbir,
    readingTime: 7,
    publishedAt: "2025-09-26",
    featured: true,
    content: `
<p>When you're starting out, every taka counts — but looking unprofessional costs you customers you'll never even know you lost. The good news: consistent, credible branding is mostly about discipline, not budget. Here's how to look established without spending like a corporation.</p>
<h2>Nail the basics first</h2>
<p>Before fancy campaigns, get these three right and use them everywhere:</p>
<ul>
<li><strong>A simple, legible logo</strong> — it doesn't need to be clever, it needs to be clear and to work in one colour.</li>
<li><strong>Two or three brand colours</strong> — pick them and never deviate.</li>
<li><strong>One or two fonts</strong> — consistency here makes everything look intentional.</li>
</ul>
<h2>Make every touchpoint match</h2>
<p>Branding is repetition. The moment your business card, packaging, social posts and receipts all look like they come from the same place, customers start to trust you. Cheap inconsistency reads as risky; cheap consistency reads as a tidy little brand.</p>
<h2>The high-impact, low-cost essentials</h2>
<ol>
<li><strong>Business cards</strong> — still the cheapest credibility you can buy.</li>
<li><strong>A logo stamp</strong> — instantly brands packaging, bags and invoices for next to nothing.</li>
<li><strong>Branded stickers</strong> — seal parcels, label products, hand them out; tiny cost, big presence.</li>
<li><strong>Custom packaging or tape</strong> — turns every delivery into an advert.</li>
<li><strong>A few branded tees</strong> — your team becomes a walking billboard at markets and pop-ups.</li>
</ol>
<blockquote>Customers can't tell your marketing budget from the outside. They can only tell whether you look like you mean it. Consistency is what "meaning it" looks like.</blockquote>
<h2>Spend where customers look most</h2>
<p>Put your limited budget where your customers' eyes actually land — usually packaging and the in-hand experience for a product business, or cards and signage for a service. Skip the rest until you've grown.</p>
<h2>Grow the kit over time</h2>
<p>You don't need everything on day one. Start with cards and a stamp, add stickers and packaging as orders grow, and bring in apparel and signage when you can. We help small businesses across Dhaka build their brand kit in affordable stages — start small, stay consistent, and look bigger than you are.</p>
`,
  },
  {
    id: "post-photo-mug-care-guide",
    slug: "photo-mug-care-guide",
    title: "How to Care for Your Custom Photo Mug",
    excerpt:
      "A printed mug is a daily keepsake — treat it right and the image stays vivid for years. Here's how to wash, store and protect your custom photo mug the simple way.",
    coverImage: "/images/blog/photo-mug-care-guide.webp",
    category: "Tips",
    tags: ["mugs", "care", "personalisation"],
    author: authors.editorial,
    readingTime: 4,
    publishedAt: "2025-10-24",
    featured: false,
    content: `
<p>A custom photo mug is one of those small joys — your morning tea in a cup that shows a face you love. The print is durable, but a few easy habits keep that image as bright as the day it arrived. Here's how to look after it.</p>
<h2>How the print is made</h2>
<p>Most quality photo mugs are sublimation-printed: the image is fused into a special coating with heat, so it's part of the surface rather than sitting on top. That makes it tough — but heat and harsh abrasion are still its two enemies.</p>
<h2>Washing: gentle wins</h2>
<ul>
<li><strong>Hand wash</strong> with warm water and a soft sponge whenever you can — it's the single best thing for longevity.</li>
<li><strong>Avoid abrasive scourers</strong> and gritty powders; they can dull the surface over time.</li>
<li><strong>If you must use a dishwasher,</strong> place the mug on the top rack and use a gentle cycle — but know that repeated hot cycles will fade any print eventually.</li>
</ul>
<h2>Heat and storage</h2>
<p>Skip the microwave where possible, especially for mugs with metallic or gold detailing. For storage, don't stack heavy items inside or scrape the printed area against other crockery.</p>
<blockquote>Treat a photo mug like a favourite shirt, not a work tool: a gentle wash and no harsh scrubbing, and it stays vivid for years.</blockquote>
<h2>If it ever fades</h2>
<p>Prints last a long time with this care, but mugs are inexpensive to reprint. Keep your original photo file safe and we can make a fresh one whenever you like — or print the same image across a matching set so you always have a spare.</p>
`,
  },
  {
    id: "post-design-files-for-printing",
    slug: "design-files-for-printing",
    title: "Preparing Design Files for Print: DPI, Bleed & Colour",
    excerpt:
      "The gap between a design that looks great on screen and one that prints great comes down to three things. Here's a plain-English guide to DPI, bleed and colour mode.",
    coverImage: "/images/blog/design-files-for-printing.webp",
    category: "Guide",
    tags: ["design-files", "print", "artwork"],
    author: authors.ria,
    readingTime: 6,
    publishedAt: "2026-01-08",
    featured: false,
    content: `
<p>We've all seen it: a design that looks crisp and vivid on a laptop turns up blurry, cropped or oddly coloured in print. It's almost never the printer's fault — it's the file. Get these three fundamentals right and your prints will match your screen far more closely.</p>
<h2>DPI: resolution for print</h2>
<p>DPI (dots per inch) is how much detail your file holds at its printed size. Screens are forgiving at 72 DPI; print is not. For sharp results, supply artwork at <strong>300 DPI at the final printed size</strong>. Blowing up a small low-resolution image won't add detail — it just makes the blur bigger.</p>
<h2>Bleed: print past the edge</h2>
<p>If your design runs to the edge of the page, it needs "bleed" — extra artwork extending beyond where the paper will be cut. Without it, tiny shifts during trimming leave thin white slivers at the edges.</p>
<ul>
<li>Add roughly <strong>3mm of bleed</strong> on every side.</li>
<li>Keep important text and logos a safe margin <em>inside</em> the cut line.</li>
<li>Extend backgrounds and images fully into the bleed area.</li>
</ul>
<h2>Colour: RGB vs CMYK</h2>
<p>Screens mix light in RGB; printers mix ink in CMYK. Some bright RGB colours — electric blues, neon greens — simply can't be reproduced in CMYK and will shift when printed. Design in or convert to CMYK so what you see is closer to what you'll get, and you won't be surprised.</p>
<blockquote>Design for the medium, not the screen. CMYK colour, 300 DPI, 3mm of bleed — three habits that prevent ninety percent of print disappointments.</blockquote>
<h2>The file format to send</h2>
<ol>
<li><strong>Vector (PDF, AI, EPS)</strong> — best for logos, type and anything that scales: stays sharp at any size.</li>
<li><strong>High-resolution PDF or TIFF</strong> — best for photo-heavy designs.</li>
<li><strong>Flatten and embed</strong> fonts and images so nothing shifts on our end.</li>
</ol>
<p>Not a designer? Don't worry. Send us what you have and our team will prep the file properly — and flag anything that won't print well before we go to press, never after.</p>
`,
  },
  {
    id: "post-eco-friendly-printing",
    slug: "eco-friendly-printing",
    title: "Eco-Friendly Printing: Jute, Cotton & Water-Based Inks",
    excerpt:
      "Sustainable printing isn't a compromise on quality — it's a set of better choices. Here's how jute, organic cotton and water-based inks let you brand responsibly.",
    coverImage: "/images/blog/eco-friendly-printing.webp",
    category: "Ideas",
    tags: ["eco-friendly", "sustainability", "materials"],
    author: authors.editorial,
    readingTime: 6,
    publishedAt: "2025-11-28",
    featured: false,
    content: `
<p>More customers than ever ask us how to brand without leaving a mess behind — and Bangladesh, as the home of jute, is well placed to do it. The good news is that sustainable choices have caught up on quality. Here's how to print responsibly without settling for less.</p>
<h2>Jute: the golden fibre</h2>
<p>Jute is biodegradable, renewable and grown right here. A branded jute bag is sturdy, looks premium, and replaces dozens of single-use plastic bags over its life. For retail packaging, gift bags and corporate giveaways, it's hard to beat — practical and a quiet statement of values.</p>
<h2>Organic and natural cotton</h2>
<p>For apparel and tote bags, organic cotton is grown without synthetic pesticides and is fully biodegradable. It prints beautifully and feels great. Pair it with a recycled or undyed natural finish and you've got merch people are proud to carry.</p>
<h2>Water-based and eco inks</h2>
<p>Traditional plastisol inks sit on top of fabric and contain PVC. Water-based inks soak into the fibre instead, giving a soft, breathable print with a far lighter environmental footprint.</p>
<ul>
<li><strong>Feel:</strong> soft and integrated, not a heavy plastic layer.</li>
<li><strong>Breathability:</strong> better, which matters in our climate.</li>
<li><strong>Footprint:</strong> fewer harmful chemicals and easier cleanup.</li>
</ul>
<blockquote>Sustainability sells when it's also better. A soft water-based print on organic cotton simply feels nicer to wear — the planet benefit is a bonus.</blockquote>
<h2>Small changes, real difference</h2>
<ol>
<li>Swap plastic packaging for jute, paper or recycled board.</li>
<li>Choose natural-fibre garments over pure synthetics where you can.</li>
<li>Ask for water-based inks on your apparel runs.</li>
<li>Print only what you need — thoughtful quantities cut the most waste of all.</li>
</ol>
<p>Want to green up your next order? Tell us your goals and we'll suggest materials and methods that match your brand and your budget — responsibly made, properly printed.</p>
`,
  },
  {
    id: "post-business-card-design-tips",
    slug: "business-card-design-tips",
    title: "8 Business Card Design Tips That Get You Remembered",
    excerpt:
      "A business card has about three seconds to make an impression. Here are eight practical design tips that keep your card out of the bin and in someone's wallet.",
    coverImage: "/images/blog/business-card-design-tips.webp",
    category: "Business",
    tags: ["business-cards", "design", "branding"],
    author: authors.sabbir,
    readingTime: 5,
    publishedAt: "2025-12-18",
    featured: false,
    content: `
<p>In an era of digital everything, a well-made business card still does something a phone number can't: it puts a physical, memorable object in someone's hand. But only if it's designed with intent. Here are eight tips we give every client.</p>
<h2>1. Keep it clean</h2>
<p>White space is not wasted space. A card crammed with information looks cheap and reads slowly. Give the essentials room to breathe and the eye knows where to go.</p>
<h2>2. Prioritise the information</h2>
<p>Name, role, one phone number, one email, and your brand. Everything else is optional. A card is a doorway, not a brochure.</p>
<h2>3. Make it legible</h2>
<p>Skip tiny fonts and low-contrast colours. If someone has to squint, you've already lost them. Keep body text at a readable size and ensure strong contrast.</p>
<h2>4–6. Get the details right</h2>
<ul>
<li><strong>Mind the bleed and margins</strong> — keep text well inside the trim line so nothing gets cut.</li>
<li><strong>Use both sides</strong> — logo and tagline on the back is elegant and useful.</li>
<li><strong>Match your brand</strong> — same colours and fonts as the rest of your identity.</li>
</ul>
<h2>7. Consider the finish</h2>
<p>A small upgrade transforms perceived value: matte lamination feels soft and modern, spot UV adds shine to a logo, and a slightly thicker stock feels serious in the hand. These touches cost little and say a lot.</p>
<h2>8. Add a reason to keep it</h2>
<p>A useful back — a mini calendar, a QR code to your catalogue, a small discount — turns a card from clutter into something worth holding onto.</p>
<blockquote>The best business card does two jobs: it tells people how to reach you, and it makes them feel something about your brand before you've said a word.</blockquote>
<p>Bring us your details and we'll design a card that does both — and advise on the stock and finish that fit your brand and budget.</p>
`,
  },
  {
    id: "post-couple-tshirt-ideas",
    slug: "couple-tshirt-ideas",
    title: "Couple T-Shirt Ideas Beyond the Cliché",
    excerpt:
      "Matching couple tees don't have to be cheesy. Here are fresh, tasteful ideas — from subtle coordinates to clever halves — that you'll actually want to wear out.",
    coverImage: "/images/blog/couple-tshirt-ideas.webp",
    category: "Ideas",
    tags: ["couple-tees", "t-shirts", "gifts"],
    author: authors.ria,
    readingTime: 5,
    publishedAt: "2026-02-26",
    featured: false,
    content: `
<p>"King" and "Queen" tees had their moment. If you want couple shirts you'll wear past the photoshoot, the trick is subtlety and wit over slogans. Here are ideas we love printing for couples who want matching, not matchy-matchy.</p>
<h2>Subtle coordinates</h2>
<p>You don't have to announce it to everyone. These read as a pair only to those who know:</p>
<ul>
<li>Matching minimalist line-art icons — a sun and a moon, a cup and a saucer.</li>
<li>The same single word in two complementary colours.</li>
<li>Your initials as a small embroidered or printed monogram over the heart.</li>
<li>Coordinates of where you met, tucked small on the chest.</li>
</ul>
<h2>Two halves of one idea</h2>
<p>Designs that only complete when you stand together are quietly charming:</p>
<ul>
<li>One shirt reads "she stole my heart", the other "so I'm stealing her last name" — for engagements.</li>
<li>A puzzle piece on each that visually interlock.</li>
<li>Two halves of a favourite lyric or a private joke.</li>
</ul>
<h2>For the milestones</h2>
<ol>
<li><strong>Anniversaries</strong> — your wedding date or "est. 20XX" in a clean type.</li>
<li><strong>Honeymoons</strong> — a tasteful destination print instead of "just married".</li>
<li><strong>Firsts</strong> — "first home", "new parents", small and understated.</li>
</ol>
<blockquote>The best couple tees feel like an inside joke, not a billboard. Keep it personal and keep it subtle, and you'll both actually reach for them.</blockquote>
<h2>Make it yours</h2>
<p>The most memorable couple shirts come from something only the two of you share — a phrase you always say, the spot you met, a date that matters. Bring us that detail and we'll turn it into something you'll wear long after the novelty wears off.</p>
`,
  },
  {
    id: "post-monogram-meaning-guide",
    slug: "monogram-meaning-guide",
    title: "Monograms 101: Order, Meaning & Style",
    excerpt:
      "A monogram looks simple, but the order of the letters follows real conventions. Here's how to arrange initials correctly for individuals and couples, and how to style them well.",
    coverImage: "/images/blog/monogram-meaning-guide.webp",
    category: "Guide",
    tags: ["monogram", "personalisation", "design"],
    author: authors.ria,
    readingTime: 5,
    publishedAt: "2025-09-12",
    featured: false,
    content: `
<p>A monogram turns initials into a small piece of personal heraldry — on stationery, a wax seal, a tote or a towel. It looks effortless, but there's a quiet etiquette to the letter order that's worth knowing before you commit it to something permanent.</p>
<h2>The single-person monogram</h2>
<p>For an individual, the traditional three-letter monogram places the <strong>surname initial in the centre, larger</strong>, flanked by the first name on the left and the middle name on the right. So Ayesha Rahman Khan becomes A<strong>K</strong>R — first, (large) last, middle.</p>
<p>For a simpler look, a two-letter monogram of first and last name initials, in normal order, never goes out of style.</p>
<h2>The couple's monogram</h2>
<p>For couples sharing a surname, the shared last initial sits large in the centre, with the two first-name initials on either side. Traditionally the partner names flank the shared surname; many modern couples simply place them in the order that looks and sounds best to them.</p>
<h2>Styling it well</h2>
<ul>
<li><strong>Interlocking serif</strong> — classic and formal, beautiful for weddings and stationery.</li>
<li><strong>Clean sans-serif</strong> — modern and versatile, great for everyday items.</li>
<li><strong>Circle or crest frame</strong> — adds a heritage feel and works superbly on stamps and seals.</li>
</ul>
<blockquote>A monogram is personal shorthand. Get the order right once and you can carry the same mark across everything you own.</blockquote>
<h2>Where monograms shine</h2>
<ol>
<li>Wax seals and stationery for weddings.</li>
<li>Embroidered or printed initials on apparel and tote bags.</li>
<li>Custom stamps for a personal or professional mark.</li>
<li>Gifts — towels, notebooks, and keepsakes that feel made-to-order.</li>
</ol>
<p>Tell us the names and the item, and we'll lay out the monogram correctly and in a style that suits you — then carry it across your whole set so everything matches.</p>
`,
  },
  {
    id: "post-bulk-order-printing-guide",
    slug: "bulk-order-printing-guide",
    title: "Bulk Order Printing: How to Save Time & Money",
    excerpt:
      "Ordering shirts or merch for a team, event or campaign? A little planning slashes the cost per piece and the stress. Here's how to run a bulk print order smoothly.",
    coverImage: "/images/blog/bulk-order-printing-guide.webp",
    category: "Business",
    tags: ["bulk-orders", "printing", "business"],
    author: authors.sabbir,
    readingTime: 6,
    publishedAt: "2026-03-28",
    featured: false,
    content: `
<p>Whether it's 50 staff polos, 200 event tees or a campaign run of tote bags, bulk orders reward planning and punish last-minute scrambles. After years of running these for clients across Dhaka, here's how to get the best price and the least stress.</p>
<h2>Why bulk is cheaper per piece</h2>
<p>Most print methods have a fixed set-up cost — making screens, preparing files, setting up the press. Spread that across 10 shirts and it's expensive per shirt; spread it across 200 and it almost disappears. That's why your tenth shirt costs far more than your two-hundredth.</p>
<h2>Plan these before you order</h2>
<ol>
<li><strong>Final quantity and size split</strong> — collect everyone's sizes <em>before</em> ordering; chasing them after causes the biggest delays.</li>
<li><strong>One locked-in design</strong> — finalise the artwork; mid-run changes are costly.</li>
<li><strong>Your real deadline</strong> — work backwards and add a buffer for approval and delivery.</li>
<li><strong>A clear budget</strong> — tell us up front and we'll match method and garment to it.</li>
</ol>
<h2>Choose the right method for the volume</h2>
<p>For bulk, screen printing usually wins on cost and durability once you're past a few dozen pieces with a simple design. For smaller or full-colour runs, DTG can be more economical. We'll steer you to whichever genuinely costs less for your job — not the one that's easiest for us.</p>
<ul>
<li><strong>Order a few spares</strong> — always add a handful for new joiners and mishaps.</li>
<li><strong>Approve a sample</strong> — sign off one finished piece before the full run.</li>
<li><strong>Consolidate</strong> — one combined order beats several small ones on price.</li>
</ul>
<blockquote>The single biggest cause of bulk-order stress isn't printing — it's collecting sizes late. Lock those down first and everything else flows.</blockquote>
<h2>Let us project-manage it</h2>
<p>For larger orders we handle sizing sheets, samples, production and delivery as one managed job. Send us the brief — quantity, design, deadline, budget — and we'll come back with a clear quote and timeline so there are no surprises.</p>
`,
  },
  {
    id: "post-wedding-stationery-checklist",
    slug: "wedding-stationery-checklist",
    title: "The Complete Wedding Stationery Checklist",
    excerpt:
      "From save-the-dates to thank-you cards, wedding stationery has more pieces than most couples expect. Here's the full checklist and a timeline so nothing gets forgotten.",
    coverImage: "/images/blog/wedding-stationery-checklist.webp",
    category: "Ideas",
    tags: ["wedding", "stationery", "checklist"],
    author: authors.editorial,
    readingTime: 7,
    publishedAt: "2026-04-30",
    featured: true,
    content: `
<p>Wedding stationery is one of those things couples underestimate until they're deep in it. It's not just the invitation — it's a whole suite of pieces, each with its own timing. Here's the complete checklist we walk Bangladeshi couples through, in the order you'll need them.</p>
<h2>Before the big day</h2>
<ul>
<li><strong>Save-the-dates</strong> — sent early so guests can plan, especially those travelling.</li>
<li><strong>The main invitation</strong> — the centrepiece; set the tone and theme here.</li>
<li><strong>RSVP cards</strong> — make replying easy with a clear card or a QR link.</li>
<li><strong>Detail/info cards</strong> — venue maps, timings, dress code, multi-event schedules.</li>
<li><strong>Envelopes and wax seals</strong> — the first thing guests touch; worth the finish.</li>
</ul>
<h2>On the day</h2>
<ul>
<li><strong>Welcome signage</strong> — a large printed sign to greet guests.</li>
<li><strong>Seating chart and place cards</strong> — keep the flow calm and organised.</li>
<li><strong>Menu cards</strong> — a lovely touch on each table or place setting.</li>
<li><strong>Programme cards</strong> — especially useful for multi-ceremony celebrations.</li>
<li><strong>Table numbers</strong> — coordinated with the seating chart.</li>
</ul>
<h2>After the celebration</h2>
<ul>
<li><strong>Thank-you cards</strong> — personalised notes that close the loop with grace.</li>
<li><strong>Photo keepsakes</strong> — prints, mini albums or cards for close family.</li>
</ul>
<h2>A simple timeline</h2>
<ol>
<li><strong>3–4 months out:</strong> finalise the design theme and send save-the-dates.</li>
<li><strong>6–8 weeks out:</strong> send the main invitation suite.</li>
<li><strong>2 weeks out:</strong> print on-the-day items once numbers are confirmed.</li>
<li><strong>After:</strong> order thank-you cards and keepsakes.</li>
</ol>
<blockquote>Design the whole suite together, not piece by piece. When the save-the-date, invitation and thank-you card all share one look, the whole wedding feels considered.</blockquote>
<p>Feeling the scale of it? That's normal. Share your date, theme and guest count and we'll map the full suite to your timeline — and design it as one cohesive set so every piece belongs.</p>
`,
  },
  {
    id: "post-logo-to-print-ready",
    slug: "logo-to-print-ready",
    title: "From Logo to Print-Ready: A Founder's Checklist",
    excerpt:
      "Your logo looks great on Instagram — but is it ready for print? Here's the founder's checklist to make sure your logo works on everything from a tiny stamp to a large banner.",
    coverImage: "/images/blog/logo-to-print-ready.webp",
    category: "Guide",
    tags: ["logo", "branding", "print"],
    author: authors.imran,
    readingTime: 6,
    publishedAt: "2026-05-16",
    featured: false,
    content: `
<p>Plenty of founders come to us with a logo that looks sharp on their phone but falls apart the moment we try to print it — pixelated on a banner, illegible on a stamp, a different colour on packaging. A logo that's truly "print-ready" passes a few key tests. Here's the checklist.</p>
<h2>1. Do you have a vector version?</h2>
<p>This is the big one. A vector file (AI, EPS or SVG) can scale from a stamp to a billboard with zero loss of quality. A JPG or PNG from a website cannot. If you only have a raster image, getting your logo redrawn as a vector is the best money you'll spend.</p>
<h2>2. Does it work in one colour?</h2>
<p>Your logo will sometimes need to print in a single colour — on a stamp, an embossed card, an engraving, a one-colour screen print. Make sure you have a solid black and a "reversed" white version, not just the full-colour one.</p>
<h2>3. Is it legible when tiny?</h2>
<p>Shrink your logo to the size of a thumbnail. Can you still read it? Fine details and thin lines vanish at small sizes. A print-ready logo stays clear from a stamp impression to a tote bag.</p>
<h2>4. Are your colours defined?</h2>
<ul>
<li><strong>CMYK values</strong> for standard printing.</li>
<li><strong>A spot/Pantone reference</strong> if exact colour matching matters.</li>
<li><strong>HEX</strong> for anything digital.</li>
</ul>
<p>Defining these once means your brand colour looks the same on a card, a shirt and a sign.</p>
<h2>5. Do you have clear-space rules?</h2>
<p>Decide the minimum breathing room around your logo and its smallest usable size, so it's never cramped or shrunk into illegibility on a layout.</p>
<blockquote>A logo isn't finished when it looks good on screen. It's finished when it looks good as a 2cm stamp <em>and</em> a 2-metre banner — in colour and in black.</blockquote>
<h2>We'll get you press-ready</h2>
<p>If your logo isn't ticking these boxes yet, we can vectorise it, build the one-colour versions, and define your colours — so every future order, from anyone, comes out consistent. Send us what you've got and we'll tell you exactly what it needs.</p>
`,
  },
  {
    id: "post-seasonal-merch-ideas",
    slug: "seasonal-merch-ideas",
    title: "Seasonal Merch Ideas for Eid, Pohela Boishakh & Winter",
    excerpt:
      "Tie your brand to the moments people care about. Here are seasonal merch and gifting ideas for Eid, Pohela Boishakh and Bangladesh's brief, beloved winter.",
    coverImage: "/images/blog/seasonal-merch-ideas.webp",
    category: "Ideas",
    tags: ["seasonal", "merch", "festivals"],
    author: authors.editorial,
    readingTime: 6,
    publishedAt: "2026-05-02",
    featured: false,
    content: `
<p>The calendar is full of moments when people are already in a giving, celebrating mood — and brands that show up thoughtfully at those moments stay top of mind. Here's how to plan seasonal merch around the occasions that matter most in Bangladesh.</p>
<h2>Eid</h2>
<p>Eid is the season of giving, and a well-made branded gift fits right in. Think:</p>
<ul>
<li>Elegant gift hampers with branded mugs, sweets and a personalised card.</li>
<li>Custom Eid greeting cards for clients and staff.</li>
<li>Branded panjabis or tees for a team photo.</li>
<li>Festive packaging and gift tags that make any product feel special.</li>
</ul>
<h2>Pohela Boishakh</h2>
<p>The Bengali New Year is colour, culture and celebration — perfect for vibrant, locally rooted merch:</p>
<ul>
<li>Red-and-white themed tees and panjabis.</li>
<li>Tote bags with traditional motifs and folk patterns.</li>
<li>Festival mugs and printed fans for stalls and events.</li>
<li>Boishakhi greeting cards and bunting for shops.</li>
</ul>
<h2>Winter</h2>
<p>Bangladesh's winter is short but much loved — and finally the season for warmer apparel:</p>
<ol>
<li><strong>Branded hoodies and sweatshirts</strong> — the season's most-wanted custom item.</li>
<li><strong>Printed mugs</strong> for the tea-and-blanket months.</li>
<li><strong>Winter event merch</strong> for picnics, fairs and pithas.</li>
</ol>
<blockquote>Plan seasonal merch at least a month ahead. The brands that win Eid and Boishakh are the ones that started in the quiet weeks before everyone else woke up to it.</blockquote>
<h2>Get ahead of the rush</h2>
<p>The single biggest mistake with seasonal merch is leaving it late — production slots fill fast before every major festival. Tell us which season you're planning for and we'll lock in your design and delivery well before the crowd, so you're ready when the moment arrives.</p>
`,
  },
  {
    id: "post-customise-your-workspace",
    slug: "customise-your-workspace",
    title: "Personalise Your Workspace: Desk & Stationery Ideas",
    excerpt:
      "A workspace that feels like yours is one you actually enjoy sitting at. Here are simple, affordable ways to personalise your desk and stationery — at home or the office.",
    coverImage: "/images/blog/customise-your-workspace.webp",
    category: "Tips",
    tags: ["workspace", "stationery", "personalisation"],
    author: authors.ria,
    readingTime: 4,
    publishedAt: "2025-10-30",
    featured: false,
    content: `
<p>We spend a huge share of our waking hours at a desk, yet most of them look like nobody lives there. A few personalised touches turn a generic workstation into a space that feels like yours — and small, made-for-you objects genuinely lift the mood of a working day. Here are easy ideas.</p>
<h2>On the desk</h2>
<ul>
<li><strong>A photo mug or printed pen pot</strong> — a familiar face within arm's reach.</li>
<li><strong>A custom mousepad</strong> — your favourite design across the whole surface.</li>
<li><strong>A printed desk mat</strong> — instantly tidies and personalises the workspace.</li>
<li><strong>A small framed print</strong> — a quote that keeps you going, or a place you love.</li>
</ul>
<h2>Your stationery</h2>
<p>Personalised stationery makes everyday admin feel a little more intentional:</p>
<ul>
<li>A notebook with your name or monogram on the cover.</li>
<li>A custom stamp for signing off or branding your notes.</li>
<li>Personalised sticky notes and labels to keep things in order.</li>
<li>A printed planner laid out the way you actually work.</li>
</ul>
<h2>For a team office</h2>
<ol>
<li>Matching branded mugs in the kitchen.</li>
<li>Personalised name plates or desk stamps.</li>
<li>Branded notebooks and pens for everyone.</li>
<li>A printed wall piece with the company values or a map.</li>
</ol>
<blockquote>You don't need to redecorate to feel at home at work. One or two made-for-you objects on the desk does more than a whole catalogue of generic ones.</blockquote>
<p>Want to refresh your desk or kit out a whole office? Tell us your style and we'll suggest a few personalised pieces that fit your space and budget — small touches, big difference.</p>
`,
  },
];

/* ── Helpers ── */
export const postBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);

export const featuredPosts = () => blogPosts.filter((p) => p.featured);

export const postsByCategory = (category: string) =>
  blogPosts.filter((p) => p.category === category);

export const blogCategories = () =>
  Array.from(new Set(blogPosts.map((p) => p.category)));

export const relatedPosts = (post: BlogPost, limit = 3) =>
  blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .concat(blogPosts.filter((p) => p.id !== post.id && p.category !== post.category))
    .slice(0, limit);
