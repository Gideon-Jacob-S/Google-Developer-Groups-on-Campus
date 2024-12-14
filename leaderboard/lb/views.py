from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Leaderboard
from datetime import datetime
import random


# Create your views here.
@login_required
def lbb(request):
    quotes = [
        "Why do programmers prefer dark mode? Because the light attracts bugs.",
        "There are only 10 kinds of people in the world: those who understand binary and those who don’t.",
        "Programming is like writing a book... except if you miss out a single comma on page 126 the whole thing makes no sense.",
        "A good programmer is someone who always looks both ways before crossing a one-way street.",
        "I don't always test my code, but when I do, I do it in production.",
        "I have a joke on programming, but it’s still in development.",
        "Debugging: Being the detective in a criminal movie where you are also the murderer.",
        "The best thing about a Boolean is even if you are wrong, you are only off by a bit.",
        "Programmer: A machine that turns coffee into code.",
        "I wish debugging was as easy as deleting my browser history.",
        "Why do Java developers wear glasses? Because they don’t see sharp.",
        "If at first you don’t succeed, call it version 1.0.",
        "Code never lies, comments do.",
        "Programming is the art of telling another human being what one wants the computer to do.",
        "To iterate is human, to recurse divine.",
        "The problem with troubleshooting is that the trouble shoots back.",
        "There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.",
        "I’m not a magician, but I can make your bugs disappear.",
        "Real programmers count from 0.",
        "Why was the JavaScript developer sad? Because he didn’t 'null' his feelings.",
        "Don't worry if it doesn't work right. If everything did, you'd be out of a job.",
        "A programmer’s wife tells him, ‘While you’re at it, can you fix the sink?’ The programmer replies, ‘I’ll first try re-booting it.’",
        "The best way to predict the future is to invent it... and then debug it.",
        "One man’s bug is another man’s feature.",
        "Every time I write a program, I make the same mistake: I write a program.",
        "Computers are like air conditioners – they stop working when you open windows.",
        "I’m not sure what the problem is, but I’ll try turning it off and on again.",
        "Why don’t programmers like nature? It has too many bugs.",
        "Programmers are tools for building tools.",
        "Software development is like a relationship – when it works, it’s amazing, but when it goes wrong, you’re just debugging for hours.",
        "A code is like a joke: if you have to explain it, it’s not that good.",
        "There's no place like 127.0.0.1.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "The code that you write today will be written by someone else tomorrow and will look like it was written by a person from Mars.",
        "Programming is the only profession where you get paid for making mistakes and then fixing them.",
        "Without requirements or design, programming is the art of adding bugs to an empty text file.",
        "Did you know? The first computer bug was an actual insect!",
        "Random fact: The first version of Windows was actually called 'Interface Manager'.",
        "Here’s a crazy fact: The longest-running software project took 49 years!",
        "The first computer virus was created in 1986 and was called Brain.",
        "The first computer mouse was made of wood.",
        "Alan Turing, the father of modern computing, could solve problems in his head faster than most computers today.",
        "The world’s first website is still online! It was created by Tim Berners-Lee in 1991.",
        "A single Google search uses the same amount of energy as boiling a kettle.",
        "The first 1GB hard drive, introduced in 1980, weighed over 500 pounds!",
        "NASA's Mars Rover sends more data in a day than the Apollo missions did in their entire mission.",
        "In 1956, IBM introduced the first hard disk drive, which could store 5MB of data and weighed over 2 tons!",
        "The ‘@’ symbol is called an ‘at sign’, but in programming, it’s often referred to as an 'ampersat'.",
        "The first email was sent in 1971 by Ray Tomlinson to himself.",
        "The original version of the iPhone in 2007 had no app store; apps were pre-installed only.",
        "The most expensive domain name ever purchased was 'cars.com', which cost $872 million.",
        "Did you know that 'Google' was originally a misspelling of the word 'googol'?",
        "The first video game ever created was 'Tennis for Two', made in 1958.",
        "There are more mobile phones than there are people on the planet.",
        "The world’s first computer, the ‘Analytical Engine’, was designed by Charles Babbage in the 1830s.",
        "One terabyte (TB) of data is roughly equivalent to 250,000 songs or 6 million text messages.",
        "An estimated 90% of the world’s data has been generated in just the past two years.",
        "The first video uploaded to YouTube was titled 'Me at the zoo' and features co-founder Jawed Karim.",
        "The very first computer game, 'Spacewar!', was created by Steve Russell in 1962.",
        "The first computer bug was found in 1947 in the Harvard Mark II computer.",
        "Did you know? More people in the world have access to a mobile phone than to a toilet.",
        "The programming language 'Java' was initially called 'Oak'.",
        "The term 'Hacker' was originally used to describe someone who was an expert at programming, not a criminal.",
        "The word 'computer' used to mean a human who performed calculations manually before the digital version came into existence.",
        "C programming language was developed in 1972 by Dennis Ritchie at AT&T Bell Labs.",
        "The world’s largest data center, in terms of square footage, is the China Telecom in Hohhot, China.",
        "In 2009, the total data volume on the internet surpassed 1 zettabyte (one trillion gigabytes).",
        "Facebook was originally called 'Thefacebook'.",
        "Twitter’s logo is named Larry the Bird, after NBA legend Larry Bird.",
        "The first hard disk drive, introduced in 1956, could hold only 5 MB of data.",
        "Computers today are approximately 100 million times faster than the computers in the 1960s.",
        "The first Apple computer, released in 1976, sold for $666.66.",
        "There are over 1.8 billion websites on the internet as of 2024.",
        "Did you know? Over 2.5 quintillion bytes of data are created every single day.",
        "The term 'software' dates back to the early 1950s, when computers were used for accounting and business.",
        "If you put a password of 6 characters with only lowercase letters, there are 26^6 possible combinations.",
        "Did you know? Bill Gates wrote his first computer program at the age of 13!",
        "The first artificial intelligence program, the Logic Theorist, was written in 1956 by Allen Newell and Herbert A. Simon.",
        "Your computer's 'Recycle Bin' icon was initially called 'Trash' on the Macintosh.",
        "The first cell phone call was made by Martin Cooper in 1973 from a Motorola DynaTAC.",
        "The original iPod could hold only 1,000 songs, but today’s smartphones can hold tens of thousands.",
        "Cloud computing is responsible for storing and processing 90% of the world’s data today.",
        "The first tweet was sent by Jack Dorsey in 2006: 'just setting up my twttr'.",
        "By 2024, the internet’s total data storage capacity is expected to exceed 100 zettabytes.",
        "The first digital camera was invented in 1975 by Steven Sasson at Kodak.",
        "The first animated GIF was created in 1987 by Steve Wilhite.",
        "In 1993, the first popular web browser, Mosaic, was released.",
        "Did you know that more than 4 million computers are sold each day?",
        "Before the 'cloud', the data center was often known as the 'server room' and usually had fewer resources.",
        "By 2025, there will be more than 75 billion connected devices worldwide.",
        "NASA’s Voyager 1, which was launched in 1977, is still sending data back to Earth from over 22 billion kilometers away.",
        "The first touchscreen device was developed by Dr. Samuel Hurst in 1972, although it wasn’t commercially successful until the 2000s.",
        "The term 'Wi-Fi' was invented by a branding company and has no real meaning behind it.",
        "The average human has 100,000 to 150,000 hair follicles on their scalp, but your computer has millions of pixels!",
        "By 2025, experts predict that there will be more than 30 billion connected devices, meaning even more data!",
        "The first ATM machine was installed in London in 1967.",
        "It took 12 years for the internet to become popular enough for its own Wikipedia entry.",
        "Why do programmers hate nature? It’s full of bugs.",
    ]
    quotes = random.choice(quotes)
    # try:
    #     user_points = Leaderboard.objects.get(user=request.user).points
    # except Leaderboard.DoesNotExist:
    #     return HttpResponse("Leaderboard does not exist.", status=404)
    # leaderboard = Leaderboard.objects.all().order_by("-points", "-streak")
    return render(request, "leaderboard.html", {"quotes": quotes})