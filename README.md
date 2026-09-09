# TanStack Query Tasks

Single React + TypeScript project implementing the three tasks from the assignment PDF.

## Tasks

### Task 1 — Users List
- API: JSONPlaceholder users
- `useQuery`
- Query key: `["users"]`
- Loading and error states
- Search by name
- Refetch button
- Strong TypeScript interfaces
- View Details navigation

### Task 2 — Product Explorer
- API: DummyJSON products
- `useQuery`
- Query key: `["products"]`
- Product image, name, category, price, rating and stock
- Search by product name
- Category filter
- Loading/error/empty states
- Refresh button

### Task 3 — User Details with Query Key
- API: JSONPlaceholder `/users/{id}`
- Dynamic query key: `["user", userId]`
- User ID is taken from the route
- Loading/error/success states
- Invalid user ID handling
- Contact and company details

## Folder structure

```text
src/
├── components/
│   ├── ProductCard.tsx
│   ├── StatusMessage.tsx
│   └── UserCard.tsx
├── hooks/
│   ├── useProducts.ts
│   ├── useUser.ts
│   └── useUsers.ts
├── pages/
│   ├── ProductsPage.tsx
│   ├── UserDetailsPage.tsx
│   └── UsersPage.tsx
├── services/
│   ├── productService.ts
│   └── userService.ts
├── styles/
│   └── global.css
├── types/
│   ├── product.ts
│   └── user.ts
├── App.tsx
└── main.tsx
```

## Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Query flow

```text
Page
 ↓
Custom hook
 ↓
TanStack Query useQuery()
 ↓
Service function
 ↓
fetch()
 ↓
API
 ↓
Typed response
 ↓
TanStack Query cache
 ↓
React UI
```

Task 3 uses:

```ts
queryKey: ["user", userId]
```

Changing `userId` changes the query key, so TanStack Query treats each user's data as a separate cached query.
