<script setup lang="ts">
import { computed } from "vue";

import { useWishlistStore } from "../../stores/wishListStore";

import type { Product } from "../../types/product";

const props = defineProps<{
  product: Product;
}>();

const wishlistStore = useWishlistStore();

const isFavorite = computed<boolean>(() => {
  return wishlistStore.contains(props.product.id);
});

function toggleWishlist(): void {
  wishlistStore.toggleProduct(props.product);
}
</script>

<template>
  <article class="product-card">
    <button
      class="wishlist-toggle"
      type="button"
      :class="{ active: isFavorite }"
      :aria-label="
        isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai zzpreferiti'
      "
      @click="toggleWishlist"
    >
      <i
        class="bi"
        :class="isFavorite ? 'bi-heart-fill' : 'bi-heart'"
        aria-hidden="true"
      ></i>
    </button>

    <RouterLink
      class="product-link"
      :to="{
        name: 'product-detail',
        params: {
          id: product.id,
        },
      }"
    >
      <div class="product-image-area">
        <img
          class="product-image"
          :src="product.image"
          :alt="product.title"
          loading="lazy"
        />
      </div>

      <div class="product-content">
        <p class="product-category">
          {{ product.category }}
        </p>

        <h2 class="product-title">
          {{ product.title }}
        </h2>

        <div class="product-footer">
          <p class="product-price">
            {{
              product.price.toLocaleString("it-IT", {
                style: "currency",
                currency: "EUR",
              })
            }}
          </p>

          <div
            class="product-rating"
            :aria-label="`Valutazione ${product.rating.rate} su 5 stelle`"
          >
            <i class="bi bi-star-fill" aria-hidden="true"></i>

            <span class="rating-value">
              {{ product.rating.rate }}
            </span>

            <span class="rating-count">
              {{ product.rating.count }}
            </span>
          </div>
        </div>

        <span class="product-action">
          see more

          <i class="bi bi-arrow-right" aria-hidden="true"></i>
        </span>
      </div>
    </RouterLink>
  </article>
</template>

<style scoped>
.product-card {
  position: relative;

  height: 100%;
  overflow: hidden;

  border-radius: var(--radius-lg);

  background: var(--color-surface);
  box-shadow: var(--shadow-xs);

  transition:
    transform var(--transition-medium),
    box-shadow var(--transition-medium),
    background-color var(--transition-medium);
}

.product-card:hover {
  transform: translateY(-6px);

  box-shadow: var(--shadow-md);
}

.product-card:focus-within {
  outline: 3px solid var(--color-focus);
  outline-offset: 4px;
}

/* ==========================
   WISHLIST
========================== */

.wishlist-toggle {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  z-index: 3;

  display: grid;
  place-items: center;

  width: 42px;
  height: 42px;
  padding: 0;

  border: 0;
  border-radius: var(--radius-full);

  background: var(--color-overlay-light);
  color: var(--color-text-soft);

  box-shadow: 0 4px 16px rgb(0 0 0 / 8%);

  cursor: pointer;

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  transition:
    color var(--transition-fast),
    background-color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.wishlist-toggle:hover {
  transform: scale(1.08);

  background: var(--color-error-soft);
  color: var(--color-error);

  box-shadow: 0 8px 22px rgb(0 0 0 / 12%);
}

.wishlist-toggle:active {
  transform: scale(0.94);
}

.wishlist-toggle.active {
  background: var(--color-error-soft);
  color: var(--color-error);
}

.wishlist-toggle:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}

.wishlist-toggle i {
  font-size: var(--font-size-lg);
}

/* ==========================
   LINK
========================== */

.product-link {
  display: flex;
  flex-direction: column;

  height: 100%;

  color: inherit;
  text-decoration: none;
}

/* ==========================
   IMAGE
========================== */

.product-image-area {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 17rem;
  margin: var(--space-sm);
  padding: var(--space-xl);

  overflow: hidden;

  border-radius: calc(var(--radius-lg) - 4px);

  background: linear-gradient(
    145deg,
    var(--color-surface-secondary),
    var(--color-background-alt)
  );

  transition:
    background-color var(--transition-medium),
    transform var(--transition-medium);
}

.product-card:hover .product-image-area {
  transform: scale(0.99);
}

.product-image {
  display: block;

  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;

  object-fit: contain;

  filter: drop-shadow(0 12px 16px rgb(0 0 0 / 8%));

  transition:
    transform var(--transition-medium),
    filter var(--transition-medium);
}

.product-card:hover .product-image {
  transform: scale(1.045);

  filter: drop-shadow(0 16px 22px rgb(0 0 0 / 12%));
}

/* ==========================
   CONTENT
========================== */

.product-content {
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: var(--space-md) var(--space-lg) var(--space-lg);
}

/* ==========================
   CATEGORY
========================== */

.product-category {
  margin: 0 0 var(--space-sm);

  color: var(--color-primary);

  font-size: var(--font-size-xs);
  font-weight: 650;
  letter-spacing: 0.04em;
  line-height: 1.3;
  text-transform: capitalize;
}

/* ==========================
   TITLE
========================== */

.product-title {
  display: -webkit-box;

  min-height: 3.2rem;
  margin: 0 0 var(--space-lg);

  overflow: hidden;

  color: var(--color-text);

  font-size: var(--font-size-md);
  font-weight: 650;
  letter-spacing: -0.015em;
  line-height: 1.55;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  transition: color var(--transition-fast);
}

.product-card:hover .product-title {
  color: var(--color-primary);
}

/* ==========================
   PRICE AND RATING
========================== */

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: var(--space-md);
  margin-top: auto;
}

.product-price {
  margin: 0;

  color: var(--color-text);

  font-size: var(--font-size-lg);
  font-weight: 750;
  letter-spacing: -0.035em;
}

.product-rating {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  gap: 0.3rem;

  color: var(--color-text-muted);

  font-size: var(--font-size-xs);
}

.product-rating i {
  color: var(--color-rating);

  font-size: var(--font-size-xs);
}

.rating-value {
  color: var(--color-text-soft);

  font-weight: 700;
}

.rating-count {
  color: var(--color-text-light);
}

.rating-count::before {
  content: "·";
  margin-right: 0.3rem;
}

/* ==========================
   ACTION
========================== */

.product-action {
  display: inline-flex;
  align-items: center;

  width: fit-content;
  gap: var(--space-sm);
  margin-top: var(--space-lg);

  color: var(--color-text-muted);

  font-size: var(--font-size-sm);
  font-weight: 600;

  transition: color var(--transition-fast);
}

.product-action i {
  font-size: var(--font-size-sm);

  transition: transform var(--transition-fast);
}

.product-card:hover .product-action {
  color: var(--color-primary);
}

.product-card:hover .product-action i {
  transform: translateX(5px);
}

/* ==========================
   MOBILE
========================== */

@media (max-width: 576px) {
  .wishlist-toggle {
    top: var(--space-md);
    right: var(--space-md);

    width: 40px;
    height: 40px;
  }

  .product-image-area {
    height: 14rem;
    padding: var(--space-lg);
  }

  .product-content {
    padding: var(--space-md) var(--space-md) var(--space-lg);
  }

  .product-title {
    min-height: auto;

    font-size: var(--font-size-sm);
  }

  .product-price {
    font-size: var(--font-size-md);
  }

  .rating-count {
    display: none;
  }

  .product-action {
    margin-top: var(--space-md);
  }
}
</style>
