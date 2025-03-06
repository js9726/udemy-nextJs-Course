# React Learning Notes - Part 1

## 1. Reusing Components

Components are the building blocks of React applications. They allow us to create reusable UI elements. Components can be either presentational (UI only) or container components (logic + UI).

### Creating Components
There are two ways to create components:

1. **Function Components (Recommended)**
```jsx
// Greeting.jsx
function Greeting() {
  return <h1>Hello, Welcome!</h1>;
}

export default Greeting;
```

2. **Arrow Function Components**
```jsx
// Button.jsx
const Button = () => {
  return <button>Click me</button>;
};

export default Button;
```

### Component Types Examples

1. **Presentational Component**
```jsx
// UserCard.jsx
function UserCard({ name, avatar, role }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}
```

2. **Container Component**
```jsx
// UserList.jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from API
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}
```

### Using Components
```jsx
// App.jsx
import Greeting from './components/Greeting';
import Button from './components/Button';
import UserList from './components/UserList';

function App() {
  return (
    <div>
      <Greeting />
      <Button />
      <UserList />
    </div>
  );
}
```

## 2. Passing Data with Props

Props allow us to pass data from parent to child components. They are read-only and help maintain unidirectional data flow.

### Basic Props Example
```jsx
// Person.jsx
function Person({ name, age, hobbies = [] }) {
  return (
    <div className="person">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {hobbies.length > 0 && (
        <ul>
          {hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// App.jsx
function App() {
  const people = [
    { name: "John", age: 25, hobbies: ["Reading", "Gaming"] },
    { name: "Jane", age: 30, hobbies: ["Painting", "Cooking"] }
  ];

  return (
    <div className="people-list">
      {people.map(person => (
        <Person key={person.name} {...person} />
      ))}
    </div>
  );
}
```

### Props with Default Values and Type Checking
```jsx
// Card.jsx
import PropTypes from 'prop-types';

function Card({ 
  title = "Default Title", 
  content = "Default Content",
  type = "default",
  onClick 
}) {
  return (
    <div className={`card card-${type}`} onClick={onClick}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary', 'secondary']),
  onClick: PropTypes.func
};

Card.defaultProps = {
  title: "Default Title",
  content: "Default Content",
  type: "default"
};
```

### Props with Children and Render Props
```jsx
// Container.jsx
function Container({ children, renderHeader, renderFooter }) {
  return (
    <div className="container">
      {renderHeader && renderHeader()}
      <main>{children}</main>
      {renderFooter && renderFooter()}
    </div>
  );
}

// App.jsx
function App() {
  return (
    <Container
      renderHeader={() => <header>My App</header>}
      renderFooter={() => <footer>© 2024</footer>}
    >
      <h1>Main Content</h1>
      <p>This is the main content area</p>
    </Container>
  );
}
```

## 3. CSS Styling & CSS Modules

### Regular CSS with BEM Naming Convention
```jsx
// styles.css
.card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
}

.card--primary {
  border-color: blue;
  background-color: #f0f8ff;
}

.card__title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card__content {
  color: #666;
}

// Card.jsx
import './styles.css';

function Card({ type = 'default', title, content }) {
  return (
    <div className={`card card--${type}`}>
      <h3 className="card__title">{title}</h3>
      <p className="card__content">{content}</p>
    </div>
  );
}
```

### CSS Modules with Dynamic Styles
```jsx
// Button.module.css
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary {
  background-color: blue;
  color: white;
}

.secondary {
  background-color: gray;
  color: white;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

// Button.jsx
import styles from './Button.module.css';

function Button({ variant = 'primary', disabled, children }) {
  return (
    <button 
      className={`
        ${styles.button}
        ${styles[variant]}
        ${disabled ? styles.disabled : ''}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### CSS Modules with Composition
```jsx
// Card.module.css
.card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
}

.highlight {
  composes: card;
  background-color: yellow;
  border-color: orange;
}

// Card.jsx
import styles from './Card.module.css';

function Card({ isHighlighted }) {
  return (
    <div className={isHighlighted ? styles.highlight : styles.card}>
      Card Content
    </div>
  );
}
```

## Best Practices

1. **Component Organization**
   - Create a `components` folder for reusable components
   - Use PascalCase for component names
   - One component per file
   - Group related components in subfolders
   - Use index.js files for cleaner imports
   - Separate presentational and container components

2. **Props**
   - Use destructuring for cleaner code
   - Provide default values when appropriate
   - Document prop types (using PropTypes or TypeScript)
   - Use spread operator carefully
   - Keep props interface minimal
   - Use children prop for composition
   - Consider using render props for complex UI patterns

3. **CSS**
   - Use CSS Modules for component-specific styles
   - Keep styles close to their components
   - Use meaningful class names
   - Consider using CSS-in-JS for dynamic styles
   - Follow BEM naming convention for regular CSS
   - Use CSS variables for theming
   - Implement responsive design patterns
   - Consider using CSS-in-JS libraries for complex styling needs

## Common Pitfalls to Avoid

1. **Components**
   - Don't create components inside other components
   - Always capitalize component names
   - Export components properly
   - Avoid prop drilling
   - Don't over-abstract components
   - Keep components focused and single-responsibility
   - Avoid unnecessary re-renders

2. **Props**
   - Don't modify props directly
   - Handle missing props gracefully
   - Use appropriate prop types
   - Avoid passing too many props
   - Don't use props for derived state
   - Handle prop changes properly in useEffect
   - Validate prop types in development

3. **CSS**
   - Avoid global styles when possible
   - Be careful with CSS specificity
   - Don't use inline styles for complex styling
   - Avoid !important declarations
   - Handle CSS conflicts properly
   - Consider browser compatibility
   - Implement proper CSS reset/normalize

## Resources
- [React Components Documentation](https://reactjs.org/docs/components-and-props.html)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [React Props Documentation](https://reactjs.org/docs/components-and-props.html)
- [BEM Naming Convention](http://getbem.com/)
- [React PropTypes Documentation](https://reactjs.org/docs/typechecking-with-proptypes.html)
- [CSS-in-JS Solutions](https://styled-components.com/)
- [React Best Practices](https://reactjs.org/docs/thinking-in-react.html)

## Component Types Deep Dive

### Presentational Components vs Container Components

#### Presentational Components
Presentational components are focused solely on how things look. They:
- Receive data and callbacks exclusively via props
- Don't have their own state
- Are purely presentational
- Are highly reusable
- Don't know about data fetching or state management

Example of a Presentational Component:
```jsx
// UserCard.jsx - Presentational Component
function UserCard({ name, avatar, role, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
      <div className="actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

// Usage
<UserCard 
  name="John Doe"
  avatar="/images/john.jpg"
  role="Developer"
  onEdit={() => console.log('Edit clicked')}
  onDelete={() => console.log('Delete clicked')}
/>
```

#### Container Components
Container components are focused on how things work. They:
- Handle data fetching
- Manage state
- Handle business logic
- Pass data to presentational components
- Are less reusable
- Know about data fetching and state management

Example of a Container Component:
```jsx
// UserListContainer.jsx - Container Component
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Data fetching logic
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    // Business logic for editing
    console.log('Editing user:', userId);
  };

  const handleDelete = (userId) => {
    // Business logic for deleting
    console.log('Deleting user:', userId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard
          key={user.id}
          name={user.name}
          avatar={user.avatar}
          role={user.role}
          onEdit={() => handleEdit(user.id)}
          onDelete={() => handleDelete(user.id)}
        />
      ))}
    </div>
  );
}
```

### When to Use Each Type

#### Use Presentational Components When:
1. You need reusable UI components
2. The component only needs to display data
3. You want to maintain separation of concerns
4. You need to test UI components in isolation
5. You want to keep components pure and predictable

Example Use Case:
```jsx
// Button.jsx - Presentational
function Button({ variant, children, onClick }) {
  return (
    <button 
      className={`button button--${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Card.jsx - Presentational
function Card({ title, content, image }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
```

#### Use Container Components When:
1. You need to fetch data
2. You need to manage state
3. You need to handle complex business logic
4. You need to coordinate multiple presentational components
5. You need to handle side effects

Example Use Case:
```jsx
// BlogContainer.jsx - Container
function BlogContainer() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // Fetch posts based on category
    fetchPosts(category).then(setPosts);
  }, [category]);

  return (
    <div className="blog">
      <CategorySelector 
        value={category}
        onChange={setCategory}
      />
      <div className="posts-grid">
        {posts.map(post => (
          <Card
            key={post.id}
            title={post.title}
            content={post.excerpt}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
}
```

### Best Practices for Component Separation

1. **Single Responsibility**
   - Presentational components should only handle rendering
   - Container components should only handle data and logic

2. **Props Interface**
   - Keep presentational component props simple and focused
   - Use PropTypes or TypeScript for type checking

3. **State Management**
   - Keep state in container components
   - Pass state down as props to presentational components

4. **Reusability**
   - Make presentational components as reusable as possible
   - Keep container components specific to their use case

5. **Testing**
   - Presentational components are easier to test
   - Container components require more setup for testing

### Real-World Example: Todo Application

```jsx
// TodoItem.jsx - Presentational
function TodoItem({ text, completed, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />
      <span>{text}</span>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

// TodoList.jsx - Container
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <div className="add-todo">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={() => toggleTodo(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
        />
      ))}
    </div>
  );
}
``` 