<template>
  <el-tabs :tab-position="tabPosition" style>
    <el-tab-pane label="HASH">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="输入类型">
          <el-select v-model="strType" placeholder="输入类型">
            <el-option
              v-for="item in strTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-switch v-model="ishmac" active-text="HMAC" inactive-text @change="showhmac"></el-switch>
        </el-form-item>
        <el-form-item label="输入">
          <el-input v-model="input"></el-input>
        </el-form-item>
        <el-form-item label="HMAC 密钥">
          <el-input v-model="hmackey" :disabled="isInputHmac"></el-input>
        </el-form-item>
        <el-form-item label="MD5">
          <el-tooltip content="长度 16 字节" placement="top">
            <el-input v-model="formLabelAlign.md5" :disabled="true"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="SHA1">
          <el-tooltip content="长度 20 字节" placement="top">
            <el-input v-model="formLabelAlign.sha1" :disabled="true"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="SHA256">
          <el-tooltip content="长度 32 字节" placement="top">
            <el-input v-model="formLabelAlign.sha256" :disabled="true"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="SHA512">
          <el-tooltip content="长度 64 字节" placement="top">
            <el-input v-model="formLabelAlign.sha512" :disabled="true"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="SHA3">
          <el-input v-model="formLabelAlign.sha3" :disabled="true" class="input-with-select">
            <el-select
              v-model="sha3OutLen"
              placeholder="SHA3输出长度"
              slot="prepend"
              style="width: 130px"
            >
              <el-option
                v-for="item in sha3OutLenOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="RIPEMD160">
          <el-tooltip content="长度 20 字节" placement="top">
            <el-input v-model="formLabelAlign.ripemd160" :disabled="true"></el-input>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="对称加密">对称加密</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<style>
.el-form-item {
    width: 80%
}
.el-form-item__label {
    width: 5%!important
}
.el-form-item__content {
    margin-left: 5%!important
}
</style>

<script>
import tools from './Tools/util'
import CryptoJS from 'crypto-js'
export default {
    data: () => {
        return {
            tabPosition: 'left',
            labelPosition: 'left',
            input: '',
            formLabelAlign: {
                md5: '',
                sha1: '',
                sha256: '',
                sha512: '',
                sha3: '',
                ripemd160: ''
            },
            strTypeOptions: [
                {
                    value: 'String',
                    label: 'String'
                },
                {
                    value: 'HEX',
                    label: 'HEX'
                }
            ],
            sha3OutLenOptions: [
                {
                    value: 224,
                    label: '224'
                },
                {
                    value: 256,
                    label: '256'
                },
                {
                    value: 384,
                    label: '384'
                },
                {
                    value: 512,
                    label: '512'
                }
            ],
            strType: 'HEX',
            sha3OutLen: 224,
            errorShow: false,
            ishmac: false,
            hmackey: '',
            isInputHmac: true
        }
    },
    computed: {
        inputObj() {
            const { input, strType, ishmac, hmackey } = this
            return {
                input,
                strType,
                ishmac,
                hmackey
            }
        }
    },
    watch: {
        inputObj: function() {
            var reghex = new RegExp(
                '(^0x[a-f0-9].*$)|(^0X[A-F0-9].*$)|(^[A-F0-9].*$)|(^[a-f0-9].*$)'
            )
            var input = this.input
            var key = this.hmackey

            if (this.strType === 'HEX') {
                if (!this.checkhex(this.input)) {
                    return
                }
                input = CryptoJS.enc.Hex.parse(input)
                key = CryptoJS.enc.Hex.parse(key)
            }

            if (this.ishmac === true) {
                this.formLabelAlign = {
                    md5: tools.hmacmd5(input, key),
                    sha1: tools.hmacsha1(input, key),
                    sha256: tools.hmacsha256(input, key),
                    sha512: tools.hmacsha512(input, key),
                    sha3: tools.hmacsha3(input, key, this.sha3OutLen),
                    ripemd160: tools.hmacripemd160(input, key)
                }
            } else {
                this.formLabelAlign = {
                    md5: tools.md5(input),
                    sha1: tools.sha1(input),
                    sha256: tools.sha256(input),
                    sha512: tools.sha512(input),
                    sha3: tools.sha3(input, this.sha3OutLen),
                    ripemd160: tools.ripemd160(input)
                }
            }
        },
        sha3OutLen: function() {
            this.formLabelAlign.sha3 = tools.sha3(this.input, this.sha3OutLen)
        }
    },
    methods: {
        showhmac(event) {
            if (event === true) {
                this.ishmac = true
                this.isInputHmac = false
            } else {
                this.ishmac = false
                this.isInputHmac = true
            }
        },
        checkhex(input) {
            var reghex = new RegExp(
                '(^0x[a-f0-9]*$)|(^0X[A-F0-9]*$)|(^[A-F0-9]*$)|(^[a-f|0-9]*$)'
            )

            if (reghex.exec(input) === null || input.length === 0) {
                this.formLabelAlign = {}
                this.$message({
                    message: '输入错误',
                    duration: 1000,
                    type: 'error'
                })
                return false
            }

            return true
        }
    }
}
</script>
