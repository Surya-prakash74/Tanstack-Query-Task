import { Link } from "react-router-dom";
import type { User } from "../types/user";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <article className="user-card">
      <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>

      <div className="card-main">
        <div className="card-heading">
          <div>
            <h3>{user.name}</h3>
            <span className="username">@{user.username}</span>
          </div>
          <Link className="outline-button" to={`/users/${user.id}`}>
            View Details
          </Link>
        </div>

        <div className="info-grid">
          <div>
            <span className="label">Email</span>
            <span>{user.email}</span>
          </div>
          <div>
            <span className="label">Phone</span>
            <span>{user.phone}</span>
          </div>
          <div>
            <span className="label">City</span>
            <span>{user.address.city}</span>
          </div>
        </div>
      </div>
    </article>
  );
}