
import { useState } from "react";
import "./App.css";

const categories = [
  {
    title: "Actors",
    subtitle: "Your favourite movie stars",
    icon: "🎬",
    people: [
      {
        name: "Shah Rukh Khan",
        image: "https://i.pinimg.com/736x/c5/7b/3f/c57b3fce3bc1c2fcec7430277050a25b.jpg",
      },
      {
        name: "Salman Khan",
        image: "https://i.pinimg.com/736x/df/ae/29/dfae29ed782de896a6e56defd3b5b0e6.jpg",
      },
      {
        name: "Aamir Khan",
        image: "https://i.pinimg.com/736x/82/29/fa/8229fa291e0c76836caaac74b8d5331e.jpg",
      },
    ],
  },
  {
    title: "Actresses",
    subtitle: "Your favourite movie stars",
    icon: "✨",
    people: [
      {
        name: "Deepika Padukone",
        image: "https://i.pinimg.com/736x/58/98/2f/58982ffd689e4648b97406eda86a9c8d.jpg",
      },
      {
        name: "Alia Bhatt",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Alia_Bhatt.jpg",
      },
      {
        name: "Priyanka Chopra",
        image: "https://i.pinimg.com/736x/bb/00/b9/bb00b98663e534a4fb45ce1da0245f79.jpg",
      },
    ],
  },
  {
    title: "Cricketers",
    subtitle: "Your favourite cricket stars",
    icon: "🏏",
    people: [
      {
        name: "Virat Kohli",
        image: "https://i.pinimg.com/736x/6f/a4/6b/6fa46b70f18c7459d4bf59772446a8b2.jpg",
      },
      {
        name: "Shuman gill",
        image: "https://i.pinimg.com/736x/42/01/3a/42013aba3812283c4bd1bf6328eb4ab4.jpg",
      },
      {
        name: "Rohit Sharma",
        image: "https://i.pinimg.com/736x/f1/ea/20/f1ea2056d0f059fccb6595cf92409a78.jpg",
      },
    ],
  },
];

export default function App() {
  const [selected, setSelected] = useState({});
  const [activePerson, setActivePerson] = useState(null);

  function handleChange(category, name) {
    const person = category.people.find(
      (item) => item.name === name
    );

    setSelected((prev) => ({
      ...prev,
      [category.title]: name,
    }));

    if (person) {
      setActivePerson({
        ...person,
        category: category.title,
      });
    }
  }

  return (
    <main className="page">
      <header className="header">
        <span className="eyebrow">YOUR PERSONAL COLLECTION</span>
        <h1>My <span>Favourites.</span></h1>
        <p>Choose your favourite stars and make your own collection.</p>
      </header>

      <section className="category-grid">
        {categories.map((category) => (
          <article className="category-card" key={category.title}>
            <div className="card-top">
              <div className="category-icon">{category.icon}</div>
              <span className="card-number">
                {String(categories.indexOf(category) + 1).padStart(2, "0")}
              </span>
            </div>

            <h2>{category.title}</h2>
            <p className="subtitle">{category.subtitle}</p>

            <label htmlFor={category.title}>
              Choose a star
            </label>

            <select
              id={category.title}
              value={selected[category.title] || ""}
              onChange={(e) =>
                handleChange(category, e.target.value)
              }
            >
              <option value="">Select a favourite</option>
              {category.people.map((person) => (
                <option key={person.name} value={person.name}>
                  {person.name}
                </option>
              ))}
            </select>

            <button
              className="view-button"
              disabled={!selected[category.title]}
              onClick={() => {
                const person = category.people.find(
                  (item) => item.name === selected[category.title]
                );
                if (person) {
                  setActivePerson({
                    ...person,
                    category: category.title,
                  });
                }
              }}
            >
              View Favourite <span>→</span>
            </button>
          </article>
        ))}
      </section>

      <section className="preview-section">
        <div className="preview-heading">
          <div>
            <span className="eyebrow">YOUR COLLECTION</span>
            <h2>Favourite Preview</h2>
          </div>
          <span className="live-label">● LIVE PREVIEW</span>
        </div>

        <div className="preview-box">
          {activePerson ? (
            <>
              <img
                className="preview-image"
                src={activePerson.image}
                alt={activePerson.name}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="preview-info">
                <span>{activePerson.category}</span>
                <h3>{activePerson.name}</h3>
                <p>Your selected favourite ⭐</p>
              </div>
            </>
          ) : (
            <div className="empty-preview">
              <div className="empty-icon">♡</div>
              <h3>Your favourite will appear here</h3>
              <p>Select a star from any dropdown to get started.</p>
            </div>
          )}
        </div>
      </section>

      <footer>MADE WITH ♡ · MY FAVOURITES</footer>
    </main>
  );
}