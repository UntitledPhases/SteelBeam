# SteelBeam

A game library and catalog web app. Search games, build a personal library, organize into collections. Built with PHP, MySQL, JavaScript, and the RAWG API.

Team project (TeamBeam) — 4 contributors, 111 commits. I was team leader. Built for an internet computing course covering full-stack web development.

[Video demo](https://youtu.be/3dJNfKRzchY?si=BgMNVS5ntNEXu5nG)

---

## What It Does

Users create an account, search the RAWG game database, and add games to a personal library. Games can be rated, favorited, wishlisted, or marked as completed. The library is filterable by genre, platform, and collection.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | PHP |
| Database | MySQL (via XAMPP) |
| API | RAWG game database |
| Auth | Session cookies, bcrypt password hashing |

---

## Features

- User registration and login with hashed passwords
- Game search via RAWG API integration (defaults to 24 most popular, supports keyword search)
- Personal library with add/delete (delete requires confirmation)
- Game detail pages with 0–5 smiley rating scale, genre, platform, and store links
- Three collections: Favorites, Wishlisted, Completed
- Filter library by genre, platform, or collection
- Dynamic card-based UI generated from library data

---

## My Contributions

Team lead. Owned the majority of the codebase across frontend and backend.

- Login and registration pages — full stack (PHP, HTML, form handling, validation)
- Session cookie authentication logic
- Database schema design — `users` table (bcrypt hashed passwords), `games` table (FK with CASCADE delete, ENUM status, RAWG ID mapping)
- Library card generation (JavaScript + PHP)
- Significant portions of HTML structure and CSS styling
- UI iteration — reworked interface based on first-round user feedback
- API config pattern — RAWG key stored in a separate config file, included where needed

---

## Setup

Requires XAMPP (Apache + MySQL).

1. Clone repo into `htdocs`
2. Import `steelbeam.sql` into phpMyAdmin
3. Set Apache index to `login.php`
4. Navigate to `login.php` and create an account

---

## License

Unlicensed (academic project)****
