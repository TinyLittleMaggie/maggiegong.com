---
layout:  post
title:   "The Honniephone"
type:    "Project"
date:    2016-09-03 09:00:00 +0800
excerpt: "A toy musical instrument that allows children to improvise as a group. For now, made with cardboard, GarageBand and lots of love."
---

<video controls
    src="https://res.cloudinary.com/tinylittlemaggie/video/upload/v1609055301/maggiegong.com/honniephone/honniephone-demo_b8bsmh.mp4"
    poster="https://res.cloudinary.com/tinylittlemaggie/image/upload/v1609055392/maggiegong.com/honniephone/honniephone-thumb_gyjbhm.png"
    width="100%">

Sorry, your browser doesn't support embedded videos,
but don't worry, you can <a href="https://res.cloudinary.com/tinylittlemaggie/video/upload/v1609055301/maggiegong.com/honniephone/honniephone-demo_b8bsmh.mp4">download it</a>
and watch it with your favorite video player!

</video>

<br>

### The Concept

The above is a video prototype for a project that I worked on as a product design student. The idea is to design a set of musical toy for kids to make it possible for them to improvise as a group - so they can enjoy the pleasures of collaborating with others.

It probably all began with casually hanging out at a friend's place and playing guitar together. I grew up in a culture where we tend to value competition over collaboration. Even when I played guitar as a hobby, I somehow felt pressured to be "impressive" in front of others, and had found it difficult to relax and allow myself to make mistakes, be silly and have fun. I had never thought I had anything to do with "improvisation" - some magical power one would supposedly attain after years of hard work. But there was this afternoon, when my friend started strumming a few chords and asked, "Hey, why don't you try to jam along?", and I, very cautiously, stumbled upon a few notes that sounded great with his chords. Like any good friend, he encouraged me to keep playing, and as I became more relaxed, it turned into a wonderfully fun afternoon.

It made me wonder: what's making those notes sound good with the backing track? Is there a way to make improvisation easier for those who don't have a lot of professional training, and help them create something they didn't know they can?

<br>

### The Process

I used the <a href="https://www.designcouncil.org.uk/news-opinion/what-framework-innovation-design-councils-evolved-double-diamond" target="_blank">Double Diamond</a> framework to guide my work - starting off by bringing my guitar to a weekend-getaway and bugging my friends about what their experiences with music were like. I placed markers on the fretboard and asked them to try and improvise to a soundtrack. The markers indicated certain notes that would supposedly sound good with the soundtrack, and it was exciting to see how well my friends were playing along without much background in music. The idea slowly evolved as I went to schools to watch how kids played, dived into research papers and binge-watched videos about all kinds of musical technology inventions, and made various quirky little models to test with different people. I'm not entirely sure which part of the process I enjoyed the most - interviewing and watching people, messing with paper, cardboards, wires and boards, designing and acting out the interactions of the product, editing the video clips, putting together a soundtrack, and seeing it all come together - I loved all of them.

At the time you are reading this post, I still haven't gotten a chance to write about the entire process in full! (It was obviously too powerful to be summarised in a short blog post!) But if you are keen, read more about the research phase <a href="https://res.cloudinary.com/tinylittlemaggie/image/upload/v1609236317/maggiegong.com/honniephone/research-journal_qymfoj.pdf" target="_blank">here</a>.

<br>

### The Technology

The system uses an ultrasonic sensor to detect a user's input, namely the distance between the sensor and an obstacle. Then the distance is used to determine the pitch of the sound being played on top of an existing backing track.

The below video is a prototype that demonstrates how the hardware & software can work together. I put on a simple blues backing track from YouTube, used Arduino to program the hardware, and used Processing to program the software. The backing track is in the key of A minor, so I limited the output notes to its corresponding pentatonic scale. It kind of works like a theremin, but with assistance of the algorithm, you will only be playing within a certain range of notes, and these notes are all synchronised to the beats.

<video controls
    src="https://res.cloudinary.com/tinylittlemaggie/video/upload/v1609236864/maggiegong.com/honniephone/honniephone-prototype_c8otik.mp4"
    poster="https://res.cloudinary.com/tinylittlemaggie/image/upload/v1609237073/maggiegong.com/honniephone/honniephone-prototype-thumb_tvq4qk.png"
    width="100%">

Sorry, your browser doesn't support embedded videos,
but don't worry, you can <a href="https://res.cloudinary.com/tinylittlemaggie/video/upload/v1609236864/maggiegong.com/honniephone/honniephone-prototype_c8otik.mp4">download it</a>
and watch it with your favorite video player!

</video>

<br>

### The Reflection

I'm writing about this project many years after its completion (of the ideation stage!), and rewatching those videos still gives me goosebumps. I still remember it when I brought a paper model to my supervisor and how the old man held it in his hand with a childlike excitement. I remember the day when I took the 3-D printed models off the machine, ran into a group of children who happened to be in the age range the design was for, and saw how the models fit perfectly in their small palms. More than anything else I remember seeing their smiles - it was the best feeling in the world.

But perhaps good luck came to me a little too soon that I mistook those pleasant daydreams for reality, so I turned to my laptop and filled my journal with enthusiastic and exaggerated promises, leaving myself less time to focus on design and development. I hope to use this project to remember what it's like to be passionate, as well as the importance of patience and humility. Looking back on this wild and chaotic journey has always embarrassed me, and it is when I embark on my career that I start to see the long and winding journey between an idea and a real positive change in someone else's life.

There is so much to learn!





