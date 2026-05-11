import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import PostDiagram from "../components/PostDiagram";
import { getPostBySlug, getRelatedPosts } from "../data/posts";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" });

function ArticleHero({ post }) {
  return (
    <div className={`article-hero accent-${post.accent} article-hero--diagram`}>
      <span className="article-hero-grid" aria-hidden="true" />
      <PostDiagram slug={post.slug} tag={post.tag} />
      <div className="article-hero-content">
        <span className="post-cover-tag" style={{ position: "static" }}>{post.tag}</span>
      </div>
    </div>
  );
}

function Block({ block }) {
  if (block.type === "h2") return <h2>{block.text}</h2>;
  if (block.type === "p")  return <p>{block.text}</p>;
  if (block.type === "quote") return <blockquote>{block.text}</blockquote>;
  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((it) => <li key={it}>{it}</li>)}
      </ul>
    );
  }
  return null;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(slug, 3);

  return (
    <div className="page-fade" data-testid="blog-post-page">
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        keywords={post.keywords}
        geo={{ region: post.geo?.region || "Global", locale: post.geo?.locale || "en" }}
        article={{
          author: post.author?.name,
          datePublished: post.date,
          tag: post.tag,
        }}
      />

      <article className="article-page">
        <div className="container article-container">
          <Reveal>
            <Link to="/blog" className="link-arrow back-link" data-testid="back-to-blog">
              <ArrowLeft size={16} /> Back to blog
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <span className="eyebrow" style={{ marginTop: 16, display: "inline-block" }}>{post.tag}</span>
            <h1 className="article-title">{post.title}</h1>
          </Reveal>

          <Reveal delay={140}>
            <div className="article-meta">
              <span className="article-author">
                <span className="article-author-dot" /> {post.author?.name}
              </span>
              <span className="dot" />
              <span>{formatDate(post.date)}</span>
              <span className="dot" />
              <span>{post.readTime}</span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <ArticleHero post={post} />
          </Reveal>

          <Reveal delay={260}>
            <div className="article-body">
              {post.body.map((b, i) => <Block key={i} block={b} />)}
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="article-cta">
              <h3>Want this applied to your media mix?</h3>
              <p>A 30-minute walkthrough — using your campaigns, your audiences, your outcomes.</p>
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: 20 }}>
                Book a Demo <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </article>

      {related.length > 0 && (
        <section className="tile tile-alt">
          <div className="container">
            <Reveal>
              <div style={{ maxWidth: 720 }}>
                <span className="eyebrow">Keep reading</span>
                <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)" }}>More from the SYNC blog</h2>
              </div>
            </Reveal>
            <div className="post-grid">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 100}>
                  <Link to={`/blog/${p.slug}`} className={`post-card accent-${p.accent}`}>
                    <div className={`post-cover accent-${p.accent} post-cover--diagram`} aria-hidden="true">
                      <span className="post-cover-grid" />
                      <PostDiagram slug={p.slug} tag={p.tag} />
                      <span className="post-cover-tag">{p.tag}</span>
                    </div>
                    <div className="post-card-body">
                      <div className="post-meta">
                        <span>{formatDate(p.date)}</span>
                        <span className="dot" />
                        <span>{p.readTime}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.excerpt}</p>
                      <span className="post-link">Read article <ArrowRight size={16} /></span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
