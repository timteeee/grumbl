# Grumbl

---
### Like Tinder, but for restaurants to go to with your friends

---
Grumbl is a web app that aims to solve the age old problem 
of having a plan to meet up with someone for dinner,
but not being able to figure out where to go.

The basic idea is that one person starts a room, and invites
all the people they will be meeting up with. Everyone in the room is able
to chat in real time, so they can discuss the meetup location or search terms.

The host can enter the location and search terms, and 
everyone will be shown a card for each restaurant, one at a time, a la Tinder.
Each card contains a name, photo, Yelp rating, address, and a link to the Yelp page
for that restaurant to help them make their decision.

Each person can indivdually answer whether they would like to go to the 
restaurant they are looking at. Once there is a match across all users in the room
instance, they will all be notified that there is a match, and be shown the 
card for the restaurant they matched on.

---
### TODO
* About the Developer page
* Handle when a user tries to join a room that is closed
* Persistance of room state, such that if a user refreshes the page while in a room, 
their message history and current cards/which ones they have already looked at
remain
* Swipe gestures for mobile
* Friends list
* Account Page

---
### Contributing
Bug reports and pull requests are welcome on GitHub at 
https://github.com/timTonelli/grumbl. Use the [fork-and-branch](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/) workflow to contribute.

This project is intended to be a safe, welcoming space for collaboration, 
and contributors are expected to adhere to the 
[Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

---
### License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
