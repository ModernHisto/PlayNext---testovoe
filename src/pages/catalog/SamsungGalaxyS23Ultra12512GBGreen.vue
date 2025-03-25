<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app>
    <v-main>
      <v-container class="py-8">
        <!-- Навигация -->
        <v-breadcrumbs
          :items="breadcrumbs"
          class="px-0"
        />
        <v-row>
          <!-- Колонка с изображениями -->
          <v-col
            cols="12"
            md="6"
          >
            <v-carousel
              v-model="currentSlide"
              height="600"
              hide-delimiters
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(image, i) in product.images"
                :key="i"
                :src="image"
                cover
              />
            </v-carousel>

            <v-slide-group
              v-model="currentSlide"
              class="mt-2"
              show-arrows
            >
              <v-slide-group-item
                v-for="(image, i) in product.images"
                :key="i"
                v-slot="{ isSelected, toggle }"
              >
                <v-card
                  :color="isSelected ? 'primary' : undefined"
                  class="ma-2"
                  height="80"
                  width="80"
                  @click="toggle"
                >
                  <v-img
                    :src="image"
                    height="100%"
                    cover
                  />
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-col>

          <!-- Колонка с информацией -->
          <v-col
            cols="12"
            md="6"
          >
            <h1 class="text-h4 mb-2">
              {{ product.name }}
            </h1>
            <div class="text-h5 primary--text mb-4">
              {{ product.price }} ₽
            </div>

            <v-rating
              v-model="product.rating"
              color="amber"
              dense
              half-increments
              readonly
              size="20"
              class="mb-4"
            />

            <v-chip-group class="mb-6">
              <v-chip
                v-for="tag in product.tags"
                :key="tag"
                color="primary"
                small
              >
                {{ tag }}
              </v-chip>
            </v-chip-group>

            <v-btn
              color="primary"
              large
              class="mb-6"
              @click="addToCart"
            >
              <v-icon left>
                mdi-cart
              </v-icon>
              Добавить в корзину
            </v-btn>

            <!-- Закладки -->
            <v-tabs
              v-model="tab"
              class="mb-6"
            >
              <v-tab value="description">
                Описание
              </v-tab>
              <v-tab value="specs">
                Характеристики
              </v-tab>
            </v-tabs>

            <v-window v-model="tab">
              <v-window-item value="description">
                <div
                  class="text-body-1"
                  v-html="product.description"
                />
              </v-window-item>

              <v-window-item value="specs">
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr
                        v-for="(value, key) in product.specifications"
                        :key="key"
                      >
                        <td class="font-weight-bold">
                          {{ key }}
                        </td>
                        <td style="padding-left: 10px;">
                          {{ value }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>

        <!-- Форма заказа -->
        <v-row class="mt-8">
          <v-col cols="12">
            <v-card
              class="pa-6"
              outlined
            >
              <h2 class="text-h5 mb-4">
                Закажите сейчас
              </h2>

              <v-form
                ref="form"
                @submit.prevent="submitOrder"
              >
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="orderForm.name"
                      label="Ваше имя"
                      :rules="nameRules"
                      required
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="orderForm.phone"
                      v-mask="'+7 (###) ###-##-##'"
                      label="Телефон"
                      :rules="phoneRules"
                      required
                      outlined
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </v-col>
                </v-row>

                <v-btn
                  type="submit"
                  color="primary"
                  large
                  :disabled="!isFormValid"
                >
                  Заказать
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref, computed } from 'vue';
import { useGlobalStore } from '@/stores/global'

export default {
  setup() {
    const LinkHome = useGlobalStore().LinkHome
    const currentSlide = ref(0);
    const tab = ref('description');
    const orderForm = ref({
      name: '',
      phone: ''
    });

    const nameRules = [
      v => !!v || 'Имя обязательно',
      v => (v && v.length >= 2) || 'Имя слишком короткое'
    ];

    const phoneRules = [
      v => !!v || 'Телефон обязателен',
      v => (v && v.replace(/\D/g, '').length === 11) || 'Введите корректный телефон'
    ];

    const isFormValid = computed(() => {
      return orderForm.value.name && 
             orderForm.value.phone && 
             orderForm.value.phone.replace(/\D/g, '').length === 11;
    });

    const product = ref({
      name: 'Смартфон Samsung Galaxy S23 Ultra 12/512GB Green',
      price: '104 990',
      rating: 3,
      tags: ['Смартфон', 'Android', 'Samsung', 'Флагман'],
      description: `
        <p>Флагманский смартфон Samsung Galaxy S23 Ultra с революционной камерой 200 МП и мощным процессором.</p>
        <p>Основные особенности:</p>
        <ul>
          <li>Экран Dynamic AMOLED 2X 6.8" с частотой 120 Гц</li>
          <li>Процессор Snapdragon 8 Gen 2</li>
          <li>Основная камера 200 МП + 12 МП + 10 МП + 10 МП</li>
          <li>Аккумулятор 5000 мАч с быстрой зарядкой</li>
          <li>Защита IP68 от воды и пыли</li>
        </ul>
      `,
      specifications: {
        'Модель': 'Samsung Galaxy S23 Ultra',
        'Операционная система': 'Android 13',
        'Процессор': 'Snapdragon 8 Gen 2',
        'Оперативная память': '12 ГБ',
        'Встроенная память': '512 ГБ',
        'Экран': '6.8", Dynamic AMOLED 2X, 3088×1440, 120 Гц',
        'Основная камера': '200 МП + 12 МП + 10 МП + 10 МП',
        'Фронтальная камера': '12 МП',
        'Аккумулятор': '5000 мАч',
        'Вес': '234 г',
        'Габариты': '163.4 × 78.1 × 8.9 мм'
      },
      images: [
        'https://online-samsung.ru/sites/default/files/styles/product_full/public/2025-03/PC_S25_ULTRA_TITANIUM_BLACK_1.png.webp?itok=dXxQUAE1',
        'https://online-samsung.ru/sites/default/files/styles/product_full/public/2025-03/PC_S25_ULTRA_SM-S938BZKBCAU.png.webp?itok=24sgpMPl',
        'https://online-samsung.ru/sites/default/files/styles/product_full/public/2025-03/SM-S938BZKBCAU_3.png.webp?itok=5R1dv8QW',
        'https://online-samsung.ru/sites/default/files/styles/product_full/public/2025-03/SM-S938BZKBCAU_4.png.webp?itok=bByTVSzs'
      ]
    });

    const breadcrumbs = ref([
      {
        title: 'Главная',
        disabled: false,
        href: LinkHome,
      },
      {
        title: 'Смартфоны',
        disabled: false,
        href: LinkHome,
      },
      {
        title: product.value.name,
        disabled: true,
        href: '#',
      },
    ]);

    const addToCart = () => {
      alert(`Товар "${product.value.name}" добавлен в корзину`);
    };

    const submitOrder = () => {
      // Очищаем телефон от лишних символов
      const cleanPhone = orderForm.value.phone.replace(/\D/g, '');
      console.log('Отправка данных:', {
        name: orderForm.value.name,
        phone: cleanPhone
      });

      alert(`Заказ оформлен!\nИмя: ${orderForm.value.name}\nТелефон: ${orderForm.value.phone}`);
      orderForm.value.name = '';
      orderForm.value.phone = '';
    };

    return {
      nameRules,
      phoneRules,
      isFormValid,
      currentSlide,
      tab,
      product,
      breadcrumbs,
      orderForm,
      addToCart,
      submitOrder
    };
  }
};
</script>

<style>
.v-carousel {
  border-radius: 8px;
  overflow: hidden;
}
</style>