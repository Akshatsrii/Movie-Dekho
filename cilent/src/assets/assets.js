import logo from './logo.svg'
import marvelLogo from './marvelLogo.svg'
import googlePlay from './googlePlay.svg'
import appStore from './appStore.svg'
import screenImage from './screenImage.svg'
import profile from './profile.png'

export const assets = {
    logo,
    marvelLogo,
    googlePlay,
    appStore,
    screenImage,
    profile
}

export const dummyTrailers = [
    {
        image: "https://img.youtube.com/vi/FpH2F6A1q1s/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=FpH2F6A1q1s'
    },
    {
        image: "https://img.youtube.com/vi/9W5P1K4b54w/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=9W5P1K4b54w'
    },
    {
        image: "https://img.youtube.com/vi/1Kx6iP2Xb5E/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=1Kx6iP2Xb5E'
    },
    {
        image: "https://img.youtube.com/vi/0h6lRsc6z_M/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=0h6lRsc6z_M'
    },
]

const dummyCastsData = [
    { "name": "Milla Jovovich", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Dave Bautista", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Arly Jover", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Amara Okereke", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", },
    { "name": "Fraser James", "profile_path": "https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg", },
    { "name": "Deirdre Mullins", "profile_path": "https://image.tmdb.org/t/p/original/lJm89neuiVlYISEqNpGZA5kTAnP.jpg", },
    { "name": "Sebastian Stankiewicz", "profile_path": "https://image.tmdb.org/t/p/original/hLN0Ca09KwQOFLZLPIEzgTIbqqg.jpg", },
    { "name": "Tue Lunding", "profile_path": "https://image.tmdb.org/t/p/original/qY4W0zfGBYzlCyCC0QDJS1Muoa0.jpg", },
    { "name": "Jacek Dzisiewicz", "profile_path": "https://image.tmdb.org/t/p/original/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg", },
    { "name": "Ian Hanmore", "profile_path": "https://image.tmdb.org/t/p/original/yhI4MK5atavKBD9wiJtaO1say1p.jpg", },
    { "name": "Eveline Hall", "profile_path": "https://image.tmdb.org/t/p/original/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg", },
    { "name": "Kamila Klamut", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Caoilinn Springall", "profile_path": "https://image.tmdb.org/t/p/original/uZNtbPHowlBYo74U1qlTaRlrdiY.jpg", },
    { "name": "Jan Kowalewski", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Pawel Wysocki", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Simon Lööf", "profile_path": "https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg", },
    { "name": "Tomasz Cymerman", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", }
]

// import { dummyCastsData } from "./dummyCastsData.js";

export const dummyShowsData = [
   
  {
    id: 1,
    title: "Dune: Part Two",
    overview:
      "Paul Atreides unites with the Fremen and embarks on a spiritual and martial journey to become the prophesied ruler.",
    poster_path: "https://image.tmdb.org/t/p/original/8bcoRX3hQRHufLPSDREdvr3YMXx.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg",
    vote_average: 8.5,
    release_date: "2024-03-01",
    genre: ["Sci-Fi", "Adventure"],
    runtime: 166,
  },
  
  {
    id: 4,
    title: "Avatar: The Way of Water",
    overview:
      "Jake Sully and Neytiri have formed a family and must protect their home when an ancient threat resurfaces.",
    poster_path: "https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/5P8SmMzSNYikXpxil6BYzJ16611.jpg",
    vote_average: 7.7,
    release_date: "2022-12-16",
    genre: ["Action", "Adventure", "Sci-Fi"],
    runtime: 192,
  },
  
  {
    id: 6,
    title: "Deadpool 3: Deadpool & Wolverine",
    overview:
      "Deadpool joins forces with Wolverine for a multiversal mission that tests the limits of chaos and heroism.",
    poster_path: "https://image.tmdb.org/t/p/original/j9YqfNAbYzRz3kxP2fAEKAEi0eD.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    vote_average: 8.8,
    release_date: "2024-07-26",
    genre: ["Action", "Comedy", "Superhero"],
    runtime: 130,
  },
  
  {
    id: 8,
    title: "The Batman",
    overview:
      "When a sadistic killer leaves behind a trail of cryptic clues, Batman must uncover Gotham’s hidden corruption.",
    poster_path: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/xHrp2pq73oi9D64xigPjWW1wcz1.jpg",
    vote_average: 8.3,
    release_date: "2022-03-04",
    genre: ["Action", "Crime"],
    runtime: 176,
  },
  
  {
    id: 10,
    title: "Venom: The Last Dance",
    overview:
      "Eddie Brock and Venom face their toughest challenge yet — a deadly alien force threatening both worlds.",
    poster_path: "https://image.tmdb.org/t/p/original/hEw3o6YUZkU4oV8kN6jzUCrA4pP.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
    vote_average: 7.9,
    release_date: "2024-10-25",
    genre: ["Action", "Sci-Fi"],
    runtime: 138,
  },


  {
    "_id": "324544",
    "id": 324544,
    "title": "In the Lost Lands",
    "overview": "A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness of the Lost Lands in search of a magical power, where she and her guide, the drifter Boyce, must outwit and outfight both man and demon.",
    "poster_path": "https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg",
    "genres": [
      { "id": 28, "name": "Action" },
      { "id": 14, "name": "Fantasy" },
      { "id": 12, "name": "Adventure" }
    ],
    "casts": dummyCastsData,
    "release_date": "2025-02-27",
    "original_language": "en",
    "tagline": "She seeks the power to free her people.",
    "vote_average": 6.4,
    "vote_count": 15000,
    "runtime": 102,
  },
  {
    "_id": "1232546",
    "id": 1232546,
    "title": "Until Dawn",
    "overview": "One year after her sister mysteriously disappeared, Clover and her friends explore an abandoned visitor center only to realize they're trapped in a repeating nightmare.",
    "poster_path": "https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/icFWIk1KfkWLZnugZAJEDauNZ94.jpg",
    "genres": [
      { "id": 27, "name": "Horror" },
      { "id": 9648, "name": "Mystery" }
    ],
    "casts": dummyCastsData,
    "release_date": "2025-04-23",
    "original_language": "en",
    "tagline": "Every night a different nightmare.",
    "vote_average": 6.4,
    "vote_count": 18000,
    "runtime": 103,
  },
  {
    "_id": "552524",
    "id": 552524,
    "title": "Lilo & Stitch",
    "overview": "A lonely Hawaiian girl befriends a fugitive alien who helps her mend her broken family.",
    "poster_path": "https://image.tmdb.org/t/p/original/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
    "genres": [
      { "id": 10751, "name": "Family" },
      { "id": 35, "name": "Comedy" },
      { "id": 878, "name": "Science Fiction" }
    ],
    "casts": dummyCastsData,
    "release_date": "2025-05-17",
    "original_language": "en",
    "tagline": "Hold on to your coconuts.",
    "vote_average": 7.1,
    "vote_count": 27500,
    "runtime": 108,
  },
  {
    "_id": "668489",
    "id": 668489,
    "title": "Havoc",
    "overview": "When a drug heist swerves lethally out of control, a jaded cop fights through a corrupt city's underworld to save a politician's son.",
    "poster_path": "https://image.tmdb.org/t/p/original/ubP2OsF3GlfqYPvXyLw9d78djGX.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/65MVgDa6YjSdqzh7YOA04mYkioo.jpg",
    "genres": [
      { "id": 28, "name": "Action" },
      { "id": 80, "name": "Crime" },
      { "id": 53, "name": "Thriller" }
    ],
    "casts": dummyCastsData,
    "release_date": "2025-04-25",
    "original_language": "en",
    "tagline": "No law. Only disorder.",
    "vote_average": 6.5,
    "vote_count": 35960,
    "runtime": 107,
  },
  {
    "_id": "950387",
    "id": 950387,
    "title": "A Minecraft Movie",
    "overview": "Four misfits are pulled into the Overworld and must master crafting and teamwork to return home.",
    "poster_path": "https://image.tmdb.org/t/p/original/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
    "genres": [
      { "id": 10751, "name": "Family" },
      { "id": 35, "name": "Comedy" },
      { "id": 12, "name": "Adventure" },
      { "id": 14, "name": "Fantasy" }
    ],
    "casts": dummyCastsData,
    "release_date": "2025-03-31",
    "original_language": "en",
    "tagline": "Be there and be square.",
    "vote_average": 6.5,
    "vote_count": 15225,
    "runtime": 101,
  },
  {
    "_id": "575265",
    "id": 575265,
    "title": "Mission: Impossible - The Final Reckoning",
    "overview": "Ethan Hunt faces his most dangerous mission yet against an unstoppable AI known as The Entity.",
    "poster_path": "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/1p5aI299YBnqrEEvVGJERk2MXXb.jpg",
    "genres": [
      { "id": 28, "name": "Action" },
      { "id": 12, "name": "Adventure" },
      { "id": 53, "name": "Thriller" }
    ],
    "casts": dummyCastsData,
    "release_date": "2025-05-17",
    "original_language": "en",
    "tagline": "Our lives are the sum of our choices.",
    "vote_average": 7.0,
    "vote_count": 19885,
    "runtime": 170,
  },
  {
    "_id": "986056",
    "id": 986056,
    "title": "Thunderbolts*",
    "overview": "After being ensnared in a death trap, seven misfit antiheroes embark on a dangerous mission for redemption.",
    "poster_path": "https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
    "genres": [
      { "id": 28, "name": "Action" },
      { "id": 878, "name": "Science Fiction" },
      { "id": 12, "name": "Adventure" }
    ],
    "casts": dummyCastsData,
    "release_date": "2025-04-30",
    "original_language": "en",
    "tagline": "Everyone deserves a second shot.",
    "vote_average": 7.4,
    "vote_count": 23569,
    "runtime": 127,
  },
  {
    "_id": "502356",
    "id": 502356,
    "title": "Joker: Folie à Deux",
    "overview": "Arthur Fleck reunites with Harley Quinn in a twisted tale of love, madness, and music.",
    "poster_path": "https://image.tmdb.org/t/p/original/p7C0iZC1P9sM2qj9x2yAkEo2TzF.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
    "genres": [
      { "id": 18, "name": "Drama" },
      { "id": 80, "name": "Crime" },
      { "id": 10402, "name": "Music" }
    ],
    "casts": dummyCastsData,
    "release_date": "2025-10-04",
    "original_language": "en",
    "tagline": "Madness is a duet.",
    "vote_average": 8.4,
    "vote_count": 42500,
    "runtime": 138,
  },
  {
    "_id": "447277",
    "id": 447277,
    "title": "The Marvels",
    "overview": "Captain Marvel, Monica Rambeau, and Kamala Khan must unite to face a cosmic threat that intertwines their powers.",
    "poster_path": "https://image.tmdb.org/t/p/original/3hKTh9ckwC94zU2zC3fsHiWxTCS.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/fdZpvODTX5wwkD0ikZNaClE4AoW.jpg",
    "genres": [
      { "id": 28, "name": "Action" },
      { "id": 878, "name": "Science Fiction" }
    ],
    "casts": dummyCastsData,
    "release_date": "2025-01-15",
    "original_language": "en",
    "tagline": "Higher. Further. Faster. Together.",
    "vote_average": 6.8,
    "vote_count": 22100,
    "runtime": 105,
  },
  {
    "_id": "820232",
    "id": 820232,
    "title": "Dune: Part Two",
    "overview": "Paul Atreides unites with the Fremen to wage war against the conspirators who destroyed his family.",
    "poster_path": "https://image.tmdb.org/t/p/original/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    "genres": [
      { "id": 878, "name": "Science Fiction" },
      { "id": 12, "name": "Adventure" },
      { "id": 18, "name": "Drama" }
    ],
    "casts": dummyCastsData,
    "release_date": "2025-03-01",
    "original_language": "en",
    "tagline": "Long live the fighters.",
    "vote_average": 8.7,
    "vote_count": 62000,
    "runtime": 166,
  },
 
  {
    "_id": "674324",
    "id": 674324,
    "title": "Kingdom of the Planet of the Apes",
    "overview": "Several generations after Caesar's reign, a new tyrannical ape builds an empire — and a young ape must decide his destiny.",
    "poster_path": "https://image.tmdb.org/t/p/original/6oh9m9nkgzK7XnAYQO7z3fG4ZjL.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    "genres": [
      { "id": 878, "name": "Science Fiction" },
      { "id": 12, "name": "Adventure" }
    ],
    "casts": dummyCastsData,
    "release_date": "2025-05-10",
    "original_language": "en",
    "tagline": "New empire. New evolution.",
    "vote_average": 8.1,
    "vote_count": 39000,
    "runtime": 145,
  }
];


export const dummyDateTimeData = {
    "2025-10-31": [
        { "time": "2025-10-31T09:00:00.000Z", "showId": "68395b407f6329be2bb45bd1" },
        { "time": "2025-10-31T12:30:00.000Z", "showId": "68395b407f6329be2bb45bd2" },
        { "time": "2025-10-31T15:45:00.000Z", "showId": "68395b407f6329be2bb45bd3" },
        { "time": "2025-10-31T19:00:00.000Z", "showId": "68395b407f6329be2bb45bd4" }
    ],
    "2025-11-01": [
        { "time": "2025-11-01T09:00:00.000Z", "showId": "68395b407f6329be2bb45bd5" },
        { "time": "2025-11-01T12:30:00.000Z", "showId": "68395b407f6329be2bb45bd6" },
        { "time": "2025-11-01T15:45:00.000Z", "showId": "68395b407f6329be2bb45bd7" },
        { "time": "2025-11-01T19:00:00.000Z", "showId": "68395b407f6329be2bb45bd8" }
    ],
    "2025-11-02": [
        { "time": "2025-11-02T09:00:00.000Z", "showId": "68395b407f6329be2bb45bd9" },
        { "time": "2025-11-02T12:30:00.000Z", "showId": "68395b407f6329be2bb45bda" },
        { "time": "2025-11-02T15:45:00.000Z", "showId": "68395b407f6329be2bb45bdb" },
        { "time": "2025-11-02T19:00:00.000Z", "showId": "68395b407f6329be2bb45bdc" }
    ],
    "2025-11-03": [
        { "time": "2025-11-03T09:00:00.000Z", "showId": "68395b407f6329be2bb45bdd" },
        { "time": "2025-11-03T12:30:00.000Z", "showId": "68395b407f6329be2bb45bde" },
        { "time": "2025-11-03T15:45:00.000Z", "showId": "68395b407f6329be2bb45bdf" },
        { "time": "2025-11-03T19:00:00.000Z", "showId": "68395b407f6329be2bb45be0" }
    ],
    "2025-11-04": [
        { "time": "2025-11-04T09:00:00.000Z", "showId": "68395b407f6329be2bb45be1" },
        { "time": "2025-11-04T12:30:00.000Z", "showId": "68395b407f6329be2bb45be2" },
        { "time": "2025-11-04T15:45:00.000Z", "showId": "68395b407f6329be2bb45be3" },
        { "time": "2025-11-04T19:00:00.000Z", "showId": "68395b407f6329be2bb45be4" }
    ],
    "2025-11-05": [
        { "time": "2025-11-05T09:00:00.000Z", "showId": "68395b407f6329be2bb45be5" },
        { "time": "2025-11-05T12:30:00.000Z", "showId": "68395b407f6329be2bb45be6" },
        { "time": "2025-11-05T15:45:00.000Z", "showId": "68395b407f6329be2bb45be7" },
        { "time": "2025-11-05T19:00:00.000Z", "showId": "68395b407f6329be2bb45be8" }
    ],
    "2025-11-06": [
        { "time": "2025-11-06T09:00:00.000Z", "showId": "68395b407f6329be2bb45be9" },
        { "time": "2025-11-06T12:30:00.000Z", "showId": "68395b407f6329be2bb45bea" },
        { "time": "2025-11-06T15:45:00.000Z", "showId": "68395b407f6329be2bb45beb" },
        { "time": "2025-11-06T19:00:00.000Z", "showId": "68395b407f6329be2bb45bec" }
    ],
    "2025-07-24": [
        { "time": "2025-07-24T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd1" },
        { "time": "2025-07-24T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd2" },
        { "time": "2025-07-24T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd3" }
    ],
    "2025-07-25": [
        { "time": "2025-07-25T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd4" },
        { "time": "2025-07-25T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd5" },
        { "time": "2025-07-25T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd6" }
    ],
    "2025-07-26": [
        { "time": "2025-07-26T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd7" },
        { "time": "2025-07-26T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd8" },
        { "time": "2025-07-26T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd9" }
    ],
    "2025-07-27": [
        { "time": "2025-07-27T01:00:00.000Z", "showId": "68395b407f6329be2bb45bda" },
        { "time": "2025-07-27T03:00:00.000Z", "showId": "68395b407f6329be2bb45bdb" },
        { "time": "2025-07-27T05:00:00.000Z", "showId": "68395b407f6329be2bb45bdc" }
    ]
}

export const dummyDashboardData = {
    "totalBookings": 14,
    "totalRevenue": 1517,
    "totalUser": 5,
    "activeShows": [
        {
            "_id": "68352363e96d99513e4221a4",
            "movie": dummyShowsData[0],
            "showDateTime": "2025-06-30T02:30:00.000Z",
            "showPrice": 59,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "C1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
        },
        {
            "_id": "6835238fe96d99513e4221a8",
            "movie": dummyShowsData[1],
            "showDateTime": "2025-06-30T15:30:00.000Z",
            "showPrice": 81,
            "occupiedSeats": {},
        },
        {
            "_id": "6835238fe96d99513e4221a9",
            "movie": dummyShowsData[2],
            "showDateTime": "2025-06-30T03:30:00.000Z",
            "showPrice": 81,
            "occupiedSeats": {},
        },
        {
            "_id": "6835238fe96d99513e4221aa",
            "movie": dummyShowsData[3],
            "showDateTime": "2025-07-15T16:30:00.000Z",
            "showPrice": 81,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A4": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
        },
        {
            "_id": "683682072b5989c29fc6dc0d",
            "movie": dummyShowsData[4],
            "showDateTime": "2025-06-05T15:30:00.000Z",
            "showPrice": 49,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
            "__v": 0
        },
        {
            "_id": "68380044686d454f2116b39a",
            "movie": dummyShowsData[5],
            "showDateTime": "2025-06-20T16:00:00.000Z",
            "showPrice": 79,
            "occupiedSeats": {
                "A1": "user_2xl7eCSUHddibk5lRxfOtw9RMwX",
                "A2": "user_2xl7eCSUHddibk5lRxfOtw9RMwX"
            }
        }
    ]
}


export const dummyBookingData = [
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 98,
        "bookedSeats": ["D1", "D2"],
        "isPaid": false,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 49,
        "bookedSeats": ["A1"],
        "isPaid": true,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 147,
        "bookedSeats": ["A1", "A2","A3"],
        "isPaid": true,
    },
]