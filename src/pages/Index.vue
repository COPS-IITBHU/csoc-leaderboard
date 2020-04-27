<template>
  <Layout>
    <div class="csoc-leaderboard-table">
      <b-table
        :data="getTableData"
        :loading="isLoading"
        ref="table"
        paginated
        per-page="5"
        detailed
        detail-key="rank"
        :show-detail-icon="false"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column field="rank" label="Rank" width="40" numeric>
            <b v-if="![1,2,3].includes(props.row.rank)">
              <span>{{ props.row.rank }}</span>
            </b>
            <b-icon v-else pack="fas" :style="getMedalColor(props.row.rank)" icon="medal"></b-icon>
          </b-table-column>

          <b-table-column field="profile.username" label="Username" centered searchable>
            <template>
              <span
                style="cursor:pointer;"
                class="tag is-success"
                @click="toggle(props.row)"
              >{{ props.row.profile.username }}</span>
            </template>
          </b-table-column>

          <b-table-column v-for="(task, index) in taskNames" :key="index" :label="task" centered>
            <span
              v-if="props.row.tasks[index].status === 'Submitted'"
              style="font-family: 'Baloo Bhaina 2', cursive;"
            >
              {{ props.row.tasks[index].score }} /
              <span class="csoc-total-score">
                <small>{{ props.row.tasks[index].totalScore }}</small>
              </span>
            </span>
            <span v-else style="font-family: 'Baloo Bhaina 2', cursive; color: grey;">Not Submitted</span>
          </b-table-column>

          <b-table-column label="Total Score" centered>
            <span style="font-family: 'Baloo Bhaina 2', cursive;">
              {{ props.row.score }} /
              <span class="csoc-total-score">
                <small>{{ props.row.totalScore }}</small>
              </span>
            </span>
          </b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="props.row.profile.avatar_url" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ props.row.profile.name }}</strong>
                  (<a :href="getGithubLink(props.row.profile.username)">
                    <small>@{{ props.row.profile.username }}</small>
                  </a>)
                  <br />
                  <b-collapse
                    class="card"
                    animation="slide"
                    v-for="(task, index) of props.row.submittedTasks"
                    :key="index"
                    :open="props.row.submittedTasks[index].isOpen"
                    @open="props.row.submittedTasks[index].isOpen = true"
                    @close="props.row.submittedTasks[index].isOpen = false"
                  >
                    <div slot="trigger" slot-scope="props" class="card-header" role="button">
                      <p class="card-header-title">{{ task.name }}</p>
                      <a class="card-header-icon">
                        <b-icon :icon="props.open ? 'angle-up' : 'angle-down'"></b-icon>
                      </a>
                    </div>
                    <div class="card-content">
                      <div class="content">
                        <b-table :data="props.row.submittedTasks[index].subtasks">
                          <template slot-scope="subtaskProps">
                            <b-table-column
                              field="subtask"
                              label="Subtask"
                              style="font-family: 'Baloo Bhaina 2', cursive;"
                            >{{ subtaskProps.row.name }}</b-table-column>
                            <b-table-column label="Score" centered>
                              <span style="font-family: 'Baloo Bhaina 2', cursive;">
                                {{ subtaskProps.row.score }} /
                                <span class="csoc-total-score">
                                  <small>{{ subtaskProps.row.totalScore }}</small>
                                </span>
                              </span>
                            </b-table-column>
                          </template>
                        </b-table>
                      </div>
                    </div>
                  </b-collapse>
                </p>
              </div>
            </div>
          </article>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="frown" size="is-large"></b-icon>
              </p>
              <p>No entries yet.</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </Layout>
</template>


<page-query>
query {
  tasks: allTasks {
    edges {
      node {
        taskName
        taskId
        subtasks {
          subtaskName
          totalPoints
        }
      }
    }
  }
}
</page-query>

<script>
import axios from "axios";

export default {
  metaInfo: {
    title: "Leaderboard"
  },
  data() {
    return {
      tableData: [],
      taskNames: [],
      isLoading: true
    };
  },
  computed: {
    getTableData() {
      if (this.tableData !== []) {
        return this.tableData;
      }
      return this.tableData;
    },
    themeTransitionStyle: function() {
      return this.$store.getters.inTransition ? "themeTransition" : null;
    }
  },
  methods: {
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },

    fetchDataFromBackend() {
      return axios
        .get(`https://csoc-leaderboard.herokuapp.com/leaderboard/`)
        .then(({ data }) => {
          return data;
        });
    },

    getLeaderboardData(backendData) {
      const allTasks = this.$page.tasks.edges;
      let data = {};

      for (let participant of backendData) {
        var participant_data = {
          profile: {
            username: participant.github_username,
            name: participant.github_name,
            avatar_url: participant.github_avatar_url
          },
          tasks: [],
          score: 0,
          totalScore: 0
        };

        var scoreIndex = 0;

        for (let { node } of allTasks) {
          var taskData = {
            name: node.taskName,
            subtasks: [],
            status: "Not submitted",
            score: 0,
            totalScore: 0
          };

          if (scoreIndex === participant.points.length) {
            participant_data.tasks.push(taskData);
            continue;
          }

          taskData.status = "Submitted";

          for (let subtask of node.subtasks) {
            var subtaskData = {
              name: subtask.subtaskName,
              score: 0,
              totalScore: 0
            };

            if (scoreIndex === participant.points.length) {
              throw Error("Points schema is not valid.");
            }

            subtaskData.score = participant.points[scoreIndex];
            subtaskData.totalScore = parseInt(subtask.totalPoints);

            scoreIndex += 1;

            taskData.subtasks.push(subtaskData);
            taskData.score += subtaskData.score;
            taskData.totalScore += subtaskData.totalScore;
          }

          participant_data.tasks.push(taskData);
          participant_data.score += taskData.score;
          participant_data.totalScore += taskData.totalScore;
        }

        data[participant_data.profile.username] = participant_data;
      }

      return data;
    },

    rankParticipants(leaderboardData) {
      var rankedParticipants = [];
      var allScores = [];

      for (let participant in leaderboardData) {
        allScores.push(leaderboardData[participant].score);
      }

      allScores.sort(function(a, b) {
        return b - a;
      });
      allScores = allScores.filter((a, b) => allScores.indexOf(a) === b);

      for (let score of allScores) {
        for (let participant in leaderboardData) {
          if (leaderboardData[participant].score === score) {
            var o = {
              rank: rankedParticipants.length + 1
            };
            o[participant] = leaderboardData[participant];
            rankedParticipants.push(o);
          }
        }
      }

      return rankedParticipants;
    },

    generateTableData(rankedParticipants) {
      var tableData = [];
      for (let participant of rankedParticipants) {
        var tableRow = {
          rank: participant.rank
        };

        // Some bad code
        const keys = Object.keys(participant);
        var username = "";
        for (let key of keys) {
          if (key !== "rank") {
            username = key;
          }
        }

        tableRow.profile = participant[username].profile;
        tableRow.score = participant[username].score;
        tableRow.tasks = participant[username].tasks;
        tableRow.totalScore = participant[username].totalScore;

        var submittedTasks = [];
        for (let task of tableRow.tasks) {
          if (task.status === "Submitted") {
            task.isOpen = false;
            submittedTasks.push(task);
          }
        }
        tableRow.submittedTasks = submittedTasks;

        tableData.push(tableRow);
      }
      this.tableData = tableData;
    },

    getTaskNames() {
      const allTasks = this.$page.tasks.edges.reverse();
      for (let { node } of allTasks) {
        this.taskNames.push(node.taskName);
      }
    },

    getGithubLink(username) {
      return "https://www.github.com/" + username;
    },

    getMedalColor(rank) {
      if (rank === 1) {
        return "color: gold";
      } else if (rank === 2) {
        return "color: silver";
      } else {
        return "color: brown";
      }
    }
  },
  mounted() {
    this.getTaskNames();
    this.fetchDataFromBackend().then(data => {
      this.generateTableData(
        this.rankParticipants(this.getLeaderboardData(data))
      );
      this.isLoading = false;
    });
  }
};
</script>

<style>
.csoc-leaderboard-table {
  display: flex;
  justify-content: center;
}

.csoc-total-score {
  font-size: 12px;
}

.pagination-link {
  color: var(--text-color);
}

.card-header-title {
  margin: auto !important;
}

.b-table .table {
  border: 1px solid var(--border-color);
}

.table {
  background: var(--background-color-secondary);
  color: var(--text-color);
}

.table thead td,
.table thead th {
  color: var(--text-color);
}

.b-table .table tr.detail {
  background: var(--background-color-tertiary);
}

strong {
  color: var(--text-color);
}

.card {
  background: var(--background-color);
}

.card-header-title {
  color: var(--text-color);
}

thead th {
  color: var(--text-color) !important;
}
</style>
