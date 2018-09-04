import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { GlobalSettings } from '../../../service/data.shared';
import { OrganizationService } from '../../organization-service';
import { CONSTANT } from '../../../constants/constants.component';
import { DomSanitizer, DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {UserStore} from '../../../user/user.store';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Http } from '@angular/http';

declare var $:JQueryStatic;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public test: any;
  public urlApi:any;
  public loading: any;
  public content: any;
  public isParameter:any;
  public isSaving:any;
  public samplerFields: any;
  public reader: FileReader = new FileReader();
  public threadGroupChildren: any;
  public controllerTags = ["CriticalSectionController",
    "ForeachController",
    "IfController",
    "IncludeController",
    "InterleaveControl",
    "kg.apc.jmeter.control.ParameterizedController",
    "LoopController",
    "ModuleController",
    "OnceOnlyController",
    "RandomController",
    "RandomOrderController",
    "RecordingController",
    "RunTime",
    "GenericController",
    "SwitchController",
    "ThroughputController",
    "TransactionController",
    "WhileController"];
  public listenerTags = ['ResultCollector',
    'BackendListener',
    'kg.apc.jmeter.vizualizers.CorrectedResultCollector'];

  public threadCount = "threadCount"; //fixed threadCount variable name

  constructor(@Inject(DOCUMENT) private document: any,public el: ElementRef, public userStore:UserStore, public organizationService: OrganizationService, public http: Http, private globalSettings: GlobalSettings, public sanitizer: DomSanitizer, public toastr: ToastrService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.test = null;
    this.isParameter = false;
    this.loading = false;
    this.samplerFields = [
      { key: 'TestPlan.comments', label: 'Comment', type: 'text' },
      { key: 'HTTPSampler.domain', label: 'Server Name or IP', type: 'text' },
      { key: 'HTTPSampler.port', label: 'Port Number', type: 'text' },
      { key: 'HTTPSampler.connect_timeout', label: 'Connection Timeouts', type: 'text' },
      { key: 'HTTPSampler.response_timeout', label: 'Response Timeouts', type: 'text' },
      { key: 'HTTPSampler.protocol', label: 'Protocol', type: 'text' },
      { key: 'HTTPSampler.method', label: 'Method', type: 'text' },
      { key: 'HTTPSampler.path', label: 'Path', type: 'text' }
    ];
    var jmxFile =  this.route.snapshot.parent!.data['jmx'];
    if(!jmxFile){
      this.toastr.error('Please upload file xml first.');
      this.router.navigate(['./'], {relativeTo: this.route}); 
      return;
    }
    //this.http.get('assets/js/sample.xml').subscribe(data => {
      var file = jmxFile.replace(/>[\s]*</g, '><');
      var xmldoc = require('xmldoc');
      var contentFile = new xmldoc.XmlDocument(file); 
      this.content =  contentFile;
      var threadGroupHashTree = contentFile.descendantWithPath('hashTree.hashTree');
      this.threadGroupChildren = this.getChildren(threadGroupHashTree.children);
      //console.log(this.threadGroupChildren)
    //});

  }


  public containKey = function (key) {
    var data = _.has(this.content.sampler.byName, key);
    return data;
  }

  public xmlToJson = function (xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof (obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof (obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }

  public json2xml = function (o, tab) {
    var toXml = function (v, name, ind) {
      var xml = "";
      if (v instanceof Array) {
        for (var i = 0, n = v.length; i < n; i++)
          xml += ind + toXml(v[i], name, ind + "\t") + "\n";
      }
      else if (typeof (v) == "object") {
        var hasChild = false;
        xml += ind + "<" + name;
        for (var m in v) {
          if (m.charAt(0) == "@")
            xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
          else
            hasChild = true;
        }
        xml += hasChild ? ">" : "/>";
        if (hasChild) {
          for (var m in v) {
            if (m == "#text")
              xml += v[m];
            else if (m == "#cdata")
              xml += "<![CDATA[" + v[m] + "]]>";
            else if (m.charAt(0) != "@")
              xml += toXml(v[m], m, ind + "\t");
          }
          xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
        }
      }
      else {
        xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
      }
      return xml;
    }, xml = "";
    for (var m in o)
      xml += toXml(o[m], m, "");
    return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
  }

  
  
  public expNode = function(node, indexParent, event) {
    if (node.coll == "exp")
      node.coll = 'coll';
    else node.coll = 'exp';
    var innerExpand = $("#node_" + indexParent).find('.inner-expand').html('');
    if(node.hashTree.children){
      var child = this.getChildren(node.hashTree.children);
      var html = '';
      var checkClass = '';
      if(this.content.sampler && node.node == this.content.sampler.node){
        checkClass = "sampler";
      }

      var self = this;
      _.each(child, function(children, index){
 
        html += '<div class="jmx-expandable" style="padding-left:10px"><div class="pa-'+node.coll+'" layout="row" layout-align="start center" class="' + checkClass + '">';
        html += '<div class="'+node.coll+'" id="expChildNode_' + indexParent + '_' + index + '"' + ' (click)="expNode(children)"></div>';
        html += '<div class="'+node.type+'"  id="openChildNode_' + indexParent + '_' + index + '"' + ' flex="flex" (click)="nodeClick(children)">'+children.node.name+'</div>';
        html += '<div class="fa fa-upload" id="copy_' + indexParent + '_' + index + '"' + ' (click)="copy(node)" ng-if="!content.dest"></div>';
        if(self.content.dest && children.type=='controller'){
          html += '<div class="fa fa-download" id="download_' + indexParent + '_' + index + '"' + '  (click)="download(node)" ></div>';
        }
        html+= '</div></div>';
       
        //self.el.nativeElement.querySelector('.openChildNode').addEventListener('click', (event) => this.nodeClick(event));
      });
      setTimeout(function(){
        _.each(child, function(children,index){
          if(self.el.nativeElement.querySelector('#openChildNode_' + indexParent + '_' + index)){
            self.el.nativeElement.querySelector('#openChildNode_' + indexParent + '_' + index).addEventListener('click', (event) => self.nodeClick(children));
            self.el.nativeElement.querySelector('#expChildNode_' + indexParent + '_' + index).addEventListener('click', (event) => self.expNode(children));
            self.el.nativeElement.querySelector('#copy_' + indexParent + '_' + index).addEventListener('click', (event) => self.copy(node));
            if(self.el.nativeElement.querySelector('#download_' + indexParent + '_' + index)){
              self.el.nativeElement.querySelector('#download_' + indexParent + '_' + index).addEventListener('click', (event) => self.download(node));
            }
          }
          
        })
      },200)

      //this.el.nativeElement.querySelector("#node_" + index).insertAdjacentHTML('beforeend', html);
     
      innerExpand.append(html);
    }
 
   
    // if (node.coll == "exp")
    // node.coll = 'coll';
    //   else node.coll = 'exp';
    
    // var innerExpand = element.find('.inner-expand');
    // var div = angular.element("<div>").addClass("jmx-expandable")
    //             .attr("style", "padding-left: 10px;")
    //             .attr("node", "child")
    //             .attr("content", "content")
    //             .attr("ng-repeat", "child in children");
    // innerExpand.append(div);
    // $compile(div)(scope);
    
  }

  public getChildren = function (hashTreeArr) {
    var ret:any = [];
      for (var i = 0; i < hashTreeArr.length; i += 2) {
        var node = {
          coll: "coll",
          node: hashTreeArr[i],
          hashTree: hashTreeArr[i + 1],
          type:''
        };
        if (_.includes(this.controllerTags, node.node.name)) node['type'] = "controller";
        if (/^.*Sampler.*$/.test(node.node.name)) node['type'] = "sampler";
        ret.push(node);
      }
      return ret;
  };

  public getHeaders = function (headerNode) {
    var props = headerNode.children[0].children;
    var ret:any = [];
    _.each(props, function (prop) {
      ret.push({
        nameNode: prop.children[0],
        valueNode: prop.children[1]
      });
    });
    return ret;
  };

  public getSamplerContent = function (samplerNode) {
    var propByName = _.keyBy(samplerNode.children, function (p) { return p.attr.name });
    return {
      node: samplerNode,
      byName: propByName
    };
  };

  

  public saveContent = function () {
    this.isSaving = true;
    var self = this;
    var content = {content: this.content.toString()}
    this.organizationService.create("organizations/"+ this.userStore.user.value.organizationId +"/projects/" + this.route.snapshot.parent!.params['projectId'] +"/tests/" + this.route.snapshot.parent!.params['testId']  + "/content", content).subscribe(res => {
      self.isSaving = false;
      self.toastr.success('Save file successfully.');
    })
  }
  //var addToXmlDoc;
  // this.content.copy = function(copyNode){
  //   $mdDialog.show({
  //     templateUrl: 'test/select-api-destination.tpl.jade',
  //     controller: function(this){
  //       this.tests = _.filter(tests, function(t){
  //         return t.testId != test.testId;
  //       });
  //       this.testSel = null;
  //       this.content = {
  //         dest: true,
  //         paste: function(pasteToNode){
  //           pasteToNode.hashTree.children.splice(0, 0, copyNode.hashTree);
  //           pasteToNode.hashTree.children.splice(0, 0, copyNode.node);
  //         }
  //       }
  //       this.selectTest = function(test){
  //         this.testSel = test;
  //         if (!test.content) {
  //           var params = _.cloneDeep($stateParams);
  //           params.testId =  test.testId;
  //           JmxService.getContent(params).then(function(content){
  //               this.testSel.content = content;
  //             });
  //         }
  //       }
  //       this.$watch("testSel.content", function(){
  //         if (this.testSel && this.testSel.content){
  //           addToXmlDoc = new XmlDocument(this.testSel.content);
  //           var threadGroupHashTree = addToXmlDoc.children[0].children[1];
  //           this.addToThreadGroupChildren = JmxService.getChildren(threadGroupHashTree.children);
  //         }
  //       });
  //       public saveContent = function(){
  //         if (addToXmlDoc) {
  //           var content = addToXmlDoc.toString();
  //           this.saving = true;
  //           var params = _.cloneDeep($stateParams);
  //           params.testId = this.testSel.testId;
  //           JmxService.saveContent(params, content)
  //             .then(function(res){
  //               this.saving = false;
  //               $mdDialog.hide();
  //             });
  //         }
  //       }
  //       this.close = function(){
  //         $mdDialog.hide();
  //       }
  //     }
  //   });
  // }
  public nodeClick = function (node) {
    this.content.headers = null;
    this.content.sampler = null;
    if (node.type == "sampler") {
      this.content.sampler = this.getSamplerContent(node.node);
    } else if (node.node.name == "HeaderManager") {
      this.content.headers = this.getHeaders(node.node);
    }
  }

}
