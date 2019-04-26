<template>
  <div class="page">
    <v-layout row>
      <v-container>
        <v-flex xs10 offset-xs1>
          <h1>About Page</h1>
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
            Aliquam vel felis metus. Aliquam congue erat nec metus facilisis
            hendrerit. Vivamus eu lobortis ligula. Nulla placerat ut ipsum at
            semper. Integer elit tortor, fringilla non pellentesque at, faucibus
            in dui. Donec malesuada sodales dolor auctor gravida. Nunc
            consectetur viverra ligula, ac aliquam elit porttitor in. Nunc
            tristique nisl nisi, eget accumsan lacus faucibus in. Nunc id
            tristique eros. Integer aliquam ipsum vitae posuere interdum.
          </p>
          <h2>Nunc magna arcu</h2>
          <p>
            Nunc magna arcu, convallis vel mollis non, vestibulum non sapien.
            Duis vulputate felis nec nunc tempor, ut ornare lacus malesuada.
            Nunc sollicitudin ipsum a nisl varius mollis. Donec in vestibulum
            neque. Vivamus ut nisi convallis, egestas lacus quis, blandit arcu.
            Etiam scelerisque purus vitae neque vehicula, ultrices tristique
            neque lacinia. Nunc pretium, justo sed efficitur fermentum, turpis
            nulla vestibulum libero, in interdum libero sem vitae augue. In nec
            lacinia tortor. Duis sed tellus aliquam, ultricies eros vitae, porta
            nulla. Curabitur vehicula, eros et condimentum molestie, augue erat
            imperdiet erat, id semper lectus erat a orci. Suspendisse diam
            mauris, consectetur non venenatis at, faucibus ultrices nunc.
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
          <comments :path="$route.path"></comments>
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
