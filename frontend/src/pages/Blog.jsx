import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import PostDiagram from "../components/PostDiagram";
import { POSTS, CATEGORIES } from "../data/posts";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" });

function PostCover({ post, ratio = "16 / 9" }) {
  return (
    <div
      className={`post-cover accent-${post.accent} post-cover--diagram`}
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
    >
      <span className="post-cover-grid" />
      <PostDiagram slug={post.slug} tag={post.tag} />
      <span className="post-cover-tag">{post.tag}</span>
    </div>
  );
}

/* Synamedia-style uniform article card */
function ArticleCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="article-card"
      data-testid={`post-card-${post.slug}`}
    >
      <div className="article-card-cover">
        <PostCover post={post} />
      </div>
      <div className="article-card-body">
        <span className="article-card-date">{formatDate(post.date)}</span>
        <h3 className="article-card-title">{post.title}</h3>
        <p className="article-card-excerpt">{post.excerpt}</p>
        <span className="article-card-link">
          Read More <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

/* Featured (large) card at top */
function FeaturedArticle({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="article-featured"
      data-testid={`post-card-${post.slug}`}
    >
      <div className="article-featured-cover">
        <PostCover post={post} ratio="16 / 9" />
      </div>
      <div className="article-featured-body">
        <span className="article-featured-tag">{post.tag}</span>
        <span className="article-card-date">{formatDate(post.date)}</span>
        <h2 className="article-featured-title">{post.title}</h2>
        <p className="article-featured-excerpt">{post.excerpt}</p>
        <span className="article-card-link">
          Read More <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

export default function Blog() {
  const [active, setActive] = useState("All");

  const featured = POSTS.find((p) => p.featured) || POSTS[0];
  const rest = useMemo(() => POSTS.filter((p) => p.slug !== featured.slug), [featured]);
  const filtered = useMemo(
    () => (active === "All" ? rest : rest.filter((p) => p.tag === active)),
    [rest, active]
  );

  return (
    <div className="page-fade" data-testid="blog-page">
      <Seo
        title="Blog — Cross-media intelligence for modern advertising"
        description="The SYNC blog: AI in adtech, cross-media measurement, connected TV, retail media, outcomes and the operating reality of modern advertising."
        path="/blog"
        keywords={[
          "AI adtech blog",
          "cross-media measurement blog",
          "connected TV India",
          "JioCinema measurement",
          "IPL audience measurement",
          "retail media measurement",
          "media optimisation",
          "frequency waste",
          "incremental reach",
          "deduplicated reach",
        ]}
      />

      {/* Synamedia-style minimal hero */}
      <section className="resource-hero">
        <div className="container">
          <Reveal>
            <nav className="resource-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>›</span>
              <Link to="/blog">Resources</Link>
              <span>›</span>
              <span aria-current="page">Blog</span>
            </nav>
            <h1 className="resource-title">Blog</h1>
            <p className="resource-sub">
              AI in adtech. Connected TV. IPL audiences. Retail media. The hard parts of measurement —
              written for senior teams who have to make the call.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured + filter + grid */}
      <section className="resource-section">
        <div className="container">
          {/* Featured article */}
          <Reveal>
            <FeaturedArticle post={featured} />
          </Reveal>

          {/* Filters */}
          <Reveal>
            <div className="resource-filter">
              <span className="resource-filter-label">Filter by topic</span>
              <div className="cat-strip" data-testid="cat-strip">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    className={`cat-chip ${active === c ? "on" : ""}`}
                    onClick={() => setActive(c)}
                    data-testid={`cat-${c.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Uniform grid */}
          {filtered.length === 0 ? (
            <Reveal>
              <div className="empty-state">
                <p>No articles in this category yet. Try another filter.</p>
              </div>
            </Reveal>
          ) : (
            <div className="article-grid" key={active}>
              {filtered.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <ArticleCard post={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="cta-band">
        <Reveal>
          <h2>One thoughtful note a month.</h2>
          <p>No fluff. No "ten tips" lists. Industry views from the SYNC team.</p>
          <div style={{ marginTop: 30 }}>
            <Link to="/contact" className="btn btn-primary">Subscribe</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
