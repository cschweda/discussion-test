<template>
  <div class="page">
    <v-layout row>
      <v-container>
        <v-flex xs12 sm12 md10 offset-md1>
          <h1>Contact Us</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed
            mi sit amet neque dapibus viverra. Sed volutpat a est vitae
            scelerisque. Aenean rhoncus dolor et lobortis pretium. Praesent eget
            pellentesque sapien. Aliquam non velit ipsum. Integer nec dolor at
            lectus tempus interdum sed eu turpis. Pellentesque pulvinar ex at
            turpis eleifend dapibus. Praesent vitae malesuada dolor. Etiam ac
            lacinia lorem. Pellentesque vel turpis leo. Nulla id massa suscipit,
            sodales elit id, rutrum libero. Vestibulum tristique, nunc vel
            efficitur consequat, magna orci rhoncus ipsum, ac mattis magna eros
            viverra nibh. Phasellus in quam in augue finibus aliquam. Phasellus
            nulla sem, tempus sed lobortis ullamcorper, consectetur ac massa.
            Suspendisse lorem libero, finibus sit amet nibh non, lacinia
            scelerisque nulla. Maecenas fermentum arcu mauris, eu malesuada orci
            dignissim nec.
          </p>

          <p>
            Morbi at risus eu metus eleifend dignissim. Praesent non dictum
            dolor, vitae mollis magna. Sed faucibus consequat quam. Pellentesque
            massa nulla, semper in congue eget, feugiat ac arcu. Duis eget
            convallis arcu. Curabitur eu felis ut erat dictum elementum. Donec
            et dolor felis. Mauris rutrum et odio id finibus. Phasellus at
            ullamcorper magna. Aliquam erat volutpat. Suspendisse congue, nibh
            sed vestibulum porta, massa mi egestas velit, non sagittis nulla dui
            sit amet leo. Duis non suscipit erat, eu semper sem. Ut viverra
            volutpat ipsum, feugiat tristique diam bibendum placerat. Cras
            pellentesque volutpat elit, vitae dictum purus lacinia sed. Etiam
            nec erat eu purus ullamcorper cursus.
          </p>
        </v-flex>
      </v-container>
    </v-layout>
    <v-layout row>
      <v-container>
        <v-flex xs10 offset-xs1>
          <comments :path="$route.path" :moderate="false"></comments>
        </v-flex>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import Comments from "@/components/Comments";
export default {
  components: {
    Comments
  }
};
</script>
