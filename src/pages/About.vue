<template>
  <v-card class="mx-auto pa-4">
    <h1 class="text-h3">Esta parte es el About</h1>
    <v-layout>
      <v-main>
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-card color="#385F73">
                <v-card-title class="text-h5">
                  Unlimited music now
                </v-card-title>

                <v-card-subtitle>
                  Listen to your favorite artists and albums whenever and wherever, online and offline.
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn text="Listen Now" variant="text" />
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card color="#1F7087">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="text-h5">
                      Supermodel
                    </v-card-title>

                    <v-card-subtitle>Foster the People</v-card-subtitle>

                    <v-card-actions>
                      <v-btn class="ms-2" size="small" text="START RADIO" variant="outlined" />
                    </v-card-actions>
                  </div>

                  <v-avatar class="ma-3" rounded="0" size="125">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg" />
                  </v-avatar>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card color="#952175">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="text-h5">
                      Halcyon Days
                    </v-card-title>

                    <v-card-subtitle>Ellie Goulding</v-card-subtitle>

                    <v-card-actions>
                      <v-btn class="ms-2" icon="mdi-play" variant="text" />
                    </v-card-actions>
                  </div>

                  <v-avatar class="ma-3" rounded="0" size="125">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png" />
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts" setup>
//
</script>
