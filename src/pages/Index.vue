<template>
  <Layout>
    <div class="csoc-leaderboard-table">
      <b-table
        :data="getTableData"
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
          <b-table-column field="rank" label="Rank" width="40" numeric>{{ props.row.rank }}</b-table-column>

          <b-table-column
            field="profile.username"
            label="Username"
            centered
            style="cursor:pointer;"
          >
            <template>
              <span
                class="tag is-success"
                @click="toggle(props.row)"
              >{{ props.row.profile.username }}</span>
            </template>
          </b-table-column>

          <b-table-column v-for="(task, index) in taskNames" :key="index" :label="task" centered>
            <span
              v-if="props.row.tasks[index].status === 'Submitted'"
            >{{ props.row.tasks[index].score }} / <span class="csoc-total-score">
                <small>{{ props.row.tasks[index].totalScore }}</small>
              </span></span>
            <span v-else>Not Submitted</span>
          </b-table-column>

          <b-table-column label="Total Score" centered>
            <span>
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
                  (<a :href="getGithubLink(props.row.profile.username)"><small>@{{ props.row.profile.username }}</small></a>)
                  <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                  Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                </p>
              </div>
            </div>
          </article>
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
      taskNames: []
    };
  },
  computed: {
    getTableData() {
      if (this.tableData !== []) {
        return this.tableData;
      }
      return this.tableData;
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
      const allTasks = this.$page.tasks.edges.reverse();
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

        tableData.push(tableRow);
      }
      this.tableData = tableData;
    },
    getTaskNames() {
      const allTasks = this.$page.tasks.edges;
      for (let { node } of allTasks) {
        this.taskNames.push(node.taskName);
      }
    },
    getGithubLink(username) {
      return 'https://www.github.com/' + username;
    }
  },
  mounted() {
    this.fetchDataFromBackend().then(data => {
      this.generateTableData(
        this.rankParticipants(this.getLeaderboardData(data))
      );
      this.getTaskNames();
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
</style>
