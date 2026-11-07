import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { useTranslation } from '../hooks/useTranslation';
import './NotFound.css';

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <title>{`404 – ${t.notFound.title} | Arch Studio`}</title>
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">{t.notFound.title}</h1>
      <p className="not-found-message">{t.notFound.message}</p>
      <Link to={ROUTES.HOME} className="not-found-link" viewTransition>
        {t.notFound.backHome} →
      </Link>
    </div>
  );
}

export default NotFound;
