<template>
  <v-app>
    <v-main>
      <v-container class="py-8">
        <h1 class="text-h4 mb-6">
          У нас как в Греции, все есть!
        </h1>
        
        <v-row>
          <!-- Карточка товара 1 -->
          <v-col
            cols="12"
            md="6"
          >
            <v-card 
              to="/catalog/SamsungGalaxyS23Ultra12512GBGreen"
              hover
              class="product-card"
            >
              <v-img
                src="https://online-samsung.ru/sites/default/files/styles/product_full/public/2025-03/PC_S25_ULTRA_TITANIUM_BLACK_1.png.webp?itok=dXxQUAE1"
                height="300"
                cover
                class="align-end"
              >
                <v-card-title class="text-white text-h5">
                  Samsung Galaxy S23 Ultra 12/512GB Green
                </v-card-title>
              </v-img>
              
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <v-rating
                    :model-value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="20"
                  />
                  <span class="text-h6 primary--text">104 990 ₽</span>
                </div>
                <div class="mt-2">
                  <v-chip
                    small
                    color="green"
                    text-color="white"
                  >
                    В наличии
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <!-- Карточка товара 2 -->
          <v-col
            cols="12"
            md="6"
          >
            <v-card 
              to="/catalog/SamsungGalaxyZFold6"
              hover
              class="product-card"
            >
              <v-img
                src="https://online-samsung.ru/sites/default/files/styles/product_full/public/2025-01/SMG_PC_FOLD6_NAVY_1_%2520%25281%2529.png.webp?itok=SwKeICI5"
                height="300"
                cover
                class="align-end"
              >
                <v-card-title class="text-white text-h5">
                  Samsung Galaxy Z Fold 6
                </v-card-title>
              </v-img>
              
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <v-rating
                    :model-value="3"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="20"
                  />
                  <span class="text-h6 primary--text">149 990 ₽</span>
                </div>
                <div class="mt-2">
                  <v-chip
                    small
                    color="orange"
                    text-color="white"
                  >
                    Предзаказ
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important;
}

.v-card-title {
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  padding-bottom: 16px;
  width: 100%;
}
</style>